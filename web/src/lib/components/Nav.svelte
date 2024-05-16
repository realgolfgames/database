<script lang="ts">
	import ThemeToggler from './ThemeToggler.svelte';
</script>

<nav>
	<ul>
		<li>
			<a translate="no" href="https://realgolf.games"
				><span style="font-weight: bold; color: green;">Real</span><span
					style="font-weight: bold; color: grey;">Golf.</span
				><span style="font-weight: bold; color: green;">Games</span>
			</a>
		</li>
		<li><ThemeToggler></ThemeToggler></li>
	</ul>
</nav>

<style lang="scss">
	nav {
		padding-block: 1.25rem;
		background-color: var(--nav-color);

		@media (max-width: 38rem) {
			padding-block: 0.5rem;
		}

		ul {
			list-style-type: none;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			gap: 1.25rem;
			margin-right: 20px;
			margin-left: 20px;

			li {
				display: flex;
				flex-direction: row;

				a {
					text-decoration: none !important;

					&:hover {
						text-decoration: none !important;
					}
				}
			}
		}
	}
</style>
