<script lang="ts">
	import JSZip from 'jszip';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		const formatBytes = (bytes: number, decimals = 2) => {
			if (bytes === 0) return '0 Bytes';
			const k = 1024;
			const dm = decimals < 0 ? 0 : decimals;
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			const i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
		};

		const JSONToFile = (obj: object, filename: string, data_type: string) => {
			const jsonString = JSON.stringify(obj, null, 2);
			const blob = new Blob([jsonString], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const fileSize = formatBytes(blob.size);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${filename}.json`;
			a.textContent = `Download ${data_type} Data as JSON (${fileSize})`;
			a.className = 'download-link';

			// Append the link to the download container
			const downloadContainer = document.querySelector('.download');
			if (downloadContainer) {
				downloadContainer.appendChild(a);
			}
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
			a.textContent = `Download ${data_type} Data as ZIP (${fileSize})`;
			a.className = 'download-link';

			// Append the link to the download container
			const downloadContainer = document.querySelector('.download');
			if (downloadContainer) {
				downloadContainer.appendChild(a);
			}
		};

		JSONToFile(data.games, 'games', 'Games');
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
