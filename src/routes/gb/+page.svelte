<script>
	import GameBoy from '$lib/gb/GameBoy.svelte'

	export let data
	let viewBool = false
	let textBool = false
</script>

<svelte:head><title>GB-WORK</title></svelte:head>

<GameBoy bind:viewBool bind:textBool />

<div class="absolute left-0 top-0 w-full nwp-gb" data-theme="dracula">
	<article class="content nwp-header">
		<h1>{data.name}</h1>
		<nav>
			<a href="/" class="btn btn-neutral">Start</a>
			<label for="text-block" class="btn btn-neutral"
				>{textBool ? 'Hide' : 'Show'} Chat</label>

			<label for="view-block" class="btn btn-neutral"
				>View {viewBool ? 'Trainer' : 'Fighter'}</label>
		</nav>
	</article>
</div>
