<script>
	import { onMount, tick } from 'svelte'
	import GbWindows from './GbWindows.svelte'
	import GbLayers from './GbLayers.svelte'
	import { text1, text2 } from './gb'
	import { sleep } from '../'
	export let viewBool = false
	export let textBool = false
	let menuBool = false
	let theme = 'light'
	let typespeed = 1

	function resetText() {
		text1.set('')
		text2.set('')
		return new Promise((resolve) => {
			setTimeout(resolve, 10)
		})
	}
	async function logText(t1 = '', t2 = '') {
		const dura1 = t1.length / (typespeed * 0.01)
		const dura2 = t1.length / (typespeed * 0.01)
		await resetText()
		text1.set(t1)
		await sleep(dura1 * 1.25)
		text2.set(t2)
		await sleep(dura2 * 1.5)
		return [dura1, dura2]
	}

	const welcome = async () => {
		await sleep(1000)
		viewBool = false
		menuBool = false
		let [dura1, dura2] = await logText(
			'Welcome to Nwp-studio',
			'Gameboy Battle Edition'
		)
		await sleep(600)
		text2.set('')
		await sleep(dura2 / 4)
		text1.set('')
		await sleep(dura1 / 4 + 200)
		menuBool = true
	}

	$: if (textBool) {
		welcome()
	}
	$: if (menuBool) {
		viewBool = true
	}
</script>

<section class="gb" data-theme={theme}>
	<input
		class="sr-only"
		bind:checked={textBool}
		id="text-block"
		type="checkbox" />
	<input
		class="sr-only"
		bind:checked={viewBool}
		id="view-block"
		type="checkbox" />

	<GbLayers />

	<GbWindows bind:textBool bind:menuBool>
		<header data-name="fight" class="window fight">
			<nav class="grid gap-3 h-full">
				<button class="button" data-fight="move0">TACKLE</button>
				<button class="button" data-fight="move1">TAIL WHIP</button>
				<button class="button" disabled>-</button>
				<label for="panel-fight" class="button back">cancel</label>
				<div class="window fight-details">
					<span class="type-header">TYPE/</span>
					<span class="type">NORMAL</span>
				</div>
			</nav>
		</header>
		<header data-name="item" class="window item">
			<nav class="grid gap-3 h-full p-2">
				<div class="button potion">
					<span>POTION x</span>
					<span class="potionCount">1</span>
				</div>
				<label for="panel-item" class="button back">cancel</label>
				<div class="opacity-0">3</div>
				<div class="opacity-0">4</div>
			</nav>
		</header>
		<header data-name="pkmn" class="window pkmn">
			<figure class="img-svg">
				<svg width="171" height="171" data-width="100%" data-height="auto">
					<use xlink:href="#pikachu_front" />
				</svg>
			</figure>
			<nav class="flex flex-wrap gap-3 p-2 absolute bottom-0 right-0">
				<label for="panel-pkmn" class="button back">action</label>
				<label for="panel-pkmn" class="button back">rest</label>
				<label for="panel-pkmn" class="button back">cancel</label>
			</nav>
		</header>
		<header data-name="run" class="window run">
			<figure class="img-svg">
				<svg width="171" height="171" data-width="100%" data-height="auto">
					<use xlink:href="#eevee_front" />
				</svg>
			</figure>
			<nav class="grid grid-cols-2 gap-3 py-2 absolute bottom-0 right-0">
				<span />
				<label for="panel-run" class="button back">cancel</label>
			</nav>
		</header>
	</GbWindows>
</section>
