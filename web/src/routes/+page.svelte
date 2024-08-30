<script lang="ts">
	import JSZip from 'jszip';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function getMonthName(monthNumber: string) {
		// Array of month names
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

		// Convert the string to a number and adjust for 0-based indexing
		const index = parseInt(monthNumber, 10) - 1;

		// Check if the index is valid (0-11)
		if (index >= 0 && index < monthNames.length) {
			return monthNames[index];
		} else {
			return 'Invalid month'; // Handle invalid input
		}
	}

	onMount(() => {
		const formatBytes = (bytes: number, decimals = 2) => {
			if (bytes === 0) return '0 Bytes';
			const k = 1024;
			const dm = decimals < 0 ? 0 : decimals;
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			const i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
		};

		const JSONToZip = async (obj: object, filename: string, data_type: string) => {
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
			a.innerHTML = `${data_type} ${fileSize} ${obj.length}`;
			a.className = 'download-link';

			// Append the link to the download container
			const downloadContainer = document.querySelector('.download');
			if (downloadContainer) {
				downloadContainer.appendChild(a);
			}
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
						(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
					);
				}
			}

			return organized;
		};

		const downloadAll = async (organizedGames: any) => {
			// Get years in descending order
			const years = Object.keys(organizedGames).sort((a, b) => parseInt(b) - parseInt(a));

			for (const year of years) {
				const yearData = organizedGames[year];

				// Get months in descending order
				const months = Object.keys(yearData).sort((a, b) => parseInt(b) - parseInt(a));

				for (const month of months) {
					const monthData = yearData[month];
					const filename = `${year}-${month}`;
					await JSONToZip(monthData, filename, `${year} - ${getMonthName(month)}`);
				}
			}
		};

		const organizedGames = organizeByDate(data.games);
		downloadAll(organizedGames);
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
<div class="download">
	<!-- The download links will be appended here -->
</div>

<style lang="scss">
	.download {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;

		.download-link {
			display: block;
			margin-top: 10px;
			padding: 10px;
			background-color: #007bff;
			color: white;
			text-decoration: none;
			border-radius: 4px;
			text-align: center;

			&:hover {
				background-color: #0056b3;
			}
		}
	}
</style>
