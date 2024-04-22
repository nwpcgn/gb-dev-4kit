<script>
	import DaisyDemo from '$lib/DaisyDemo.svelte'
	import ThemeSwitch from '$lib/ThemeSwitch.svelte'
	import Counter from '$lib/Counter.svelte'
	import Processing from '$lib/Processing.svelte'
	import { sleep } from '$lib'
	export let data
	let showDemo = false
</script>

<svelte:head><title>kit-daisy-gb</title></svelte:head>

<section class="layer">
	<article class="content">
		<header class="nwp-header">
			<h1>{data.name}</h1>
			<h4>{data.sub}</h4>
		</header>

		<div class="py-4 flex items-center gap-4">
			<ThemeSwitch />
			<Counter />
		</div>

		<DaisyDemo wrapperClass="py-4" />
		<div class="py-4">
			<a href="/gb2" class="btn btn-neutral">Gameboy V4.2</a>
			<a href="/gb" class="btn btn-neutral">Gameboy V4.1</a>
			<a href="/work" class="btn btn-neutral">Gameboy DEV</a>
			<a href="/battle" class="btn btn-neutral">Battle DEV</a>
		</div>
	</article>
</section>
