<script>
	import { theme, sleep, randInt } from '$lib'
	import Processing from '$lib/Processing.svelte'
	import SvgSprites from '$lib/SvgSprites.svelte'
	export let data
	import '../app.css'
	import '../sass.scss'
	theme.set(data && data.theme ? data.theme : 'cyberpunk')
</script>

<header>
	<div class="navbar bg-neutral text-neutral-content">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl">nwpGb</a>
		</div>
	</div>
</header>

<main class="main" data-theme={$theme}>
	{#await sleep(randInt(1600, 3200))}
		<Processing text="... initialing" />
	{:then _}
		<slot />
	{/await}
</main>

<SvgSprites />
