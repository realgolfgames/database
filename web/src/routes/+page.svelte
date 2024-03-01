<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.courses as course}
	<div>
		<p>{course.id}</p>
		<h2>{course.name}</h2>
		<p>{course.location}</p>
		<p>{course.par}</p>
		<p>{course.rating}</p>
		<p>{course.slope}</p>
	</div>
{/each}
