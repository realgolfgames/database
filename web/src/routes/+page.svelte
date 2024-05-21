<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		const JSONToFile = (obj: object, filename: string) => {
			const blob = new Blob([JSON.stringify(obj, null, 2)], {
				type: 'application/json'
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${filename}.json`;
			a.textContent = 'Download Courses Data as JSON';
			a.className = 'download-link';

			// Append the link to the download container
			const downloadContainer = document.querySelector('.download');
			if (downloadContainer) {
				downloadContainer.appendChild(a);
			}
		};

		JSONToFile(data.courses, 'courses');
	});
</script>

<svelte:head>
	<title>Real Golf open database</title>
</svelte:head>

<h1>Download Golf Course Data</h1>
<p>
	Real Golf Gof Courses are relaesed under the <a
		href="https://tldrlegal.com/license/creative-commons-cc0-1.0-universal"
		>Creative Commons CC0 license</a
	>.
</p>
<p>Use them for research, commercial purpose, publication, anything you like.</p>
<p>You can download, modify and redistribute them, without asking for permission.</p>
<div class="download">
	<!-- The download link will be appended here -->
</div>

<style>
	.download-link {
		display: block;
		margin-top: 10px;
		padding: 10px;
		background-color: #007bff;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		text-align: center;
	}

	.download-link:hover {
		background-color: #0056b3;
	}
</style>
