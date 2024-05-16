<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import '$lib/scss/app.scss';
</script>

<Nav></Nav>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		max-width: 40rem;
		margin: 0 auto;
		padding-inline: 1rem;

		@media screen and (max-width: 767px) {
			margin-bottom: 20px;
		}
	}
</style>
