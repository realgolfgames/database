<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.courses as course}
	<div class="course">
		<h2>{course.name}</h2>
		<p>{course.location}</p>
		<p>Par: {course.total_par}</p>
	</div>
{/each}
