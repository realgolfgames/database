<script lang="ts">
	import JSZip from 'jszip';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let totalGames = 0; // To store the total number of games
	let totalFiles = 0; // To store the total number of files
	let totalSizeInBytes = 0; // To store the total size in bytes
	let plainTextDownloadList = ''; // To store the plain text download list content

	onMount(() => {
		const formatBytes = (bytes: number, decimals = 2) => {
			if (bytes === 0) return '0 Bytes';
			const k = 1024;
			const dm = decimals < 0 ? 0 : decimals;
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			const i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
		};

		const getMonthName = (monthNumber: number) => {
			const monthNames = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];
			return monthNames[monthNumber - 1] || 'Invalid month';
		};

		const JSONToZip = async (obj: object, filename: string) => {
			const zip = new JSZip();
			const jsonString = JSON.stringify(obj, null, 2);
			zip.file(`${filename}.json`, jsonString);

			// Generate the zip file with compression
			const content = await zip.generateAsync({
				type: 'blob',
				compression: 'DEFLATE',
				compressionOptions: { level: 9 }
			});
			const url = URL.createObjectURL(content);
			const fileSize = formatBytes(content.size);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${filename}.zip`;
			a.textContent = `.zip`;
			a.className = 'download-link';

			// Increment total size in bytes
			totalSizeInBytes += content.size;

			// Return the download link, size for later use in the table, and URL for plain text list
			return { link: a, size: fileSize, url };
		};

		const organizeByDate = (games: any[]) => {
			const organized: { [year: string]: { [month: string]: any[] } } = {};

			games.forEach((game) => {
				const date = new Date(game.date);
				const year = date.getFullYear();
				const month = date.getMonth() + 1; // getMonth() returns 0-based month, so add 1

				if (!organized[year]) {
					organized[year] = {};
				}
				if (!organized[year][month]) {
					organized[year][month] = [];
				}
				organized[year][month].push(game);
			});

			// Sort games in each month from latest to oldest
			for (const year in organized) {
				for (const month in organized[year]) {
					organized[year][month].sort(
						(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
					);
				}
			}

			return organized;
		};

		const createTable = async (organizedGames: any) => {
			const table = document.createElement('table');
			table.className = 'games-table';

			// Create the table header
			const header = table.createTHead();
			const headerRow = header.insertRow();
			['Month', 'Size', 'Games', 'Download'].forEach((text) => {
				const th = document.createElement('th');
				th.textContent = text;
				headerRow.appendChild(th);
			});

			// Create the table body
			const tbody = table.createTBody();

			// Get years in descending order
			const years = Object.keys(organizedGames).sort((a, b) => parseInt(b) - parseInt(a));

			for (const year of years) {
				const yearData = organizedGames[year];
				// Get months in descending order
				const months = Object.keys(yearData).sort((a, b) => parseInt(b) - parseInt(a));

				for (const month of months) {
					const monthData = yearData[month];
					totalGames += monthData.length; // Calculate total number of games
					totalFiles++; // Increment total number of files
					const filename = `${year}-${month}`;

					// Create a new row for each month
					const row = tbody.insertRow();
					const cellMonth = row.insertCell();
					const cellSize = row.insertCell();
					const cellGames = row.insertCell();
					const cellDownload = row.insertCell();

					cellMonth.textContent = `${getMonthName(parseInt(month))} ${year}`;
					cellGames.textContent = monthData.length.toString();

					// Create download link and append to cell
					const { link, size, url } = await JSONToZip(monthData, filename);
					cellSize.textContent = size;
					cellDownload.appendChild(link);

					// Add to plain text download list
					plainTextDownloadList += `${filename}: ${url}\n`;
				}
			}

			// Append the table to the container
			const downloadContainer = document.querySelector('.download');
			if (downloadContainer) {
				downloadContainer.appendChild(table);
			}

			// Update the total games and total files text
			const totalGamesText = document.querySelector('.total-games-text');
			if (totalGamesText) {
				totalGamesText.textContent = `${totalGames.toLocaleString()} games, played on RealGolf.Games, in JSON format. Each file contains the games for one month only; they are not cumulative.`;
			}

			const totalFilesText = document.querySelector('.total-files-text');
			if (totalFilesText) {
				totalFilesText.textContent = `Total: ${totalFiles} files ${formatBytes(totalSizeInBytes)} ${totalGames.toLocaleString()} Games`;
			}
		};

		const organizedGames = organizeByDate(data.games);
		createTable(organizedGames);
	});
</script>

<svelte:head>
	<title>RealGolf.Games Open Database</title>
</svelte:head>

<h1>Download Golf Course Data</h1>
<p>
	RealGolf.Games Games are released under the <a
		href="https://tldrlegal.com/license/creative-commons-cc0-1.0-universal"
		target="_blank"
		rel="noopener noreferrer">Creative Commons CC0 license</a
	>. Use them for research, commercial purposes, publications, anything you like. You can download,
	modify, and redistribute them, without asking for permission.
</p>

<p class="total-games-text">
	<!-- This text will be updated dynamically -->
</p>

<div class="download">
	<!-- The download table will be appended here -->
</div>

<b class="total-files-text">
	<!-- This text will be updated dynamically to show total files, size, and games -->
</b>

<style lang="scss">
	:global(.download) {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;

		.games-table {
			width: 100%;
			border-collapse: collapse;
			margin-top: 1rem;

			th,
			td {
				border: 1px solid #ddd;
				text-align: left;
			}

			th {
				background-color: #f2f2f2;
			}

			tr {
				text-align: left;
			}

			td {
				padding: 10px;
			}

			.download-link {
				display: block;
				padding: 5px 10px;
				background-color: #007bff;
				color: white;
				text-decoration: none;
				border-radius: 4px;
				text-align: left;

				&:hover {
					background-color: #0056b3;
				}
			}
		}
	}

	.total-games-text,
	.total-files-text {
		font-size: 1.2rem;
		margin-top: 1rem;
	}
</style>
