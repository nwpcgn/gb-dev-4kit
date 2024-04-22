<script>
	import { onMount, tick } from 'svelte'
	import { sleep } from '$lib'
	import { text1, text2 } from './TextBox.svelte'
	import TextBox from './TextBox.svelte'
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
		// viewBool = false
		// menuBool = false
		let [dura1, dura2] = await logText(
			'Welcome to Nwp-studio',
			'Gameboy Battle Edition'
		)
		await sleep(600)
		text2.set('')
		await sleep(dura2 / 4)
		text1.set('')
		await sleep(dura1 / 4 + 200)
		// menuBool = true
	}
	let op1 = false
	let activeSubMenu = ''
	let showBattle = false
	let showChatbox = false
	let showMenu = false
</script>

{#if op1}
	<aside class="absolute flex gap-1 left-4 nwp-gb top-4">
		<label for="trigger-layer" class="btn btn-neutral">Layer</label>
		<label for="trigger-chatbox" class="btn btn-neutral">Chatbox</label>
	</aside>
{:else}
	<aside class="absolute right-4 nwp-gb top-4">
		<nav class=" grid gap-1">
			<input
				class="toggle gb-stat-trigger-layer"
				bind:checked={showBattle}
				type="checkbox" />
			<input
				class="toggle gb-stat-chat-box"
				bind:checked={showChatbox}
				type="checkbox"
				on:change={(e) => {
					if (!showChatbox) {
						activeSubMenu = ''
						showMenu = false
					}
				}} />

			<input
				class="gb-stat-menu toggle"
				bind:checked={showMenu}
				on:change={(e) => {
					if (!showMenu) {
						activeSubMenu = ''
					}
				}}
				disabled={!showChatbox}
				type="checkbox" />
			<input
				class="gb-stat-fight radio"
				value="fight"
				disabled={!showMenu}
				bind:group={activeSubMenu}
				type="radio" />
			<input
				class="gb-stat-item radio"
				value="item"
				disabled={!showMenu}
				bind:group={activeSubMenu}
				type="radio" />
			<input
				class="gb-stat-pkmn radio"
				value="pkmn"
				disabled={!showMenu}
				bind:group={activeSubMenu}
				type="radio" />
			<input
				class="gb-stat-run radio"
				value="run"
				disabled={!showMenu}
				bind:group={activeSubMenu}
				type="radio" />
			<input
				class="gb-stat-run radio radio-error"
				value=""
				disabled={!showChatbox}
				bind:group={activeSubMenu}
				type="radio" />
		</nav>
	</aside>
{/if}

<article class="gb4" data-theme={theme}>
	<input
		class="sr-only trigger-chatbox"
		bind:checked={showChatbox}
		id="trigger-chatbox"
		type="checkbox"
		data-pg-name="TriggerChatbox" />
	<div class="layers">
		<input
			class="sr-only trigger-layer"
			bind:checked={showBattle}
			id="trigger-layer"
			type="checkbox"
			data-pg-name="TriggerLayer" />
		<section class="gb-layer opponent">
			<div class="gb-info">
				<div class="gb-balls"><!--x  --></div>
				<div class="gb-stats">
					<div class="uppercase">eevee</div>
					<div>
						<progress class="progress" value="40" max="100" />
					</div>
				</div>
			</div>
			<figure class="gb-images">
				<svg class="battle">
					<use xlink:href="#eevee_front" />
				</svg>
				<svg class="trainer">
					<use xlink:href="#blue_front" />
				</svg>
			</figure>
		</section>
		<section class="gb-layer player">
			<div class="gb-info">
				<div class="gb-stats">
					<div class="uppercase">pikachu</div>
					<div>
						<progress class="progress" value="60" max="100" />
					</div>
				</div>
				<div class="gb-balls">
					<!-- <img src="/img/gb/red_balls.svg" alt="" /> -->
				</div>
			</div>
			<figure class="gb-images">
				<svg class="battle">
					<use xlink:href="#pikachu_back" />
				</svg>
				<svg class="trainer">
					<use xlink:href="#red_back" />
				</svg>
				<!-- <img src="/img/gb/pikachu_back.svg" alt="" class="battle" />
<img src="/img/gb/red_back.svg" alt="" class="trainer" /> -->
			</figure>
		</section>
	</div>
	<div class="windows">
		<input
			class="panel-menu sr-only"
			bind:checked={showMenu}
			id="panel-menu"
			type="checkbox" />
		<input
			class="panel-fight sr-only"
			value="fight"
			bind:group={activeSubMenu}
			id="panel-fight"
			type="radio" />
		<input
			class="panel-item sr-only"
			value="item"
			bind:group={activeSubMenu}
			id="panel-item"
			type="radio" />
		<input
			class="panel-pkmn sr-only"
			value="pkmn"
			bind:group={activeSubMenu}
			id="panel-pkmn"
			type="radio" />
		<input
			class="panel-run sr-only"
			value="run"
			bind:group={activeSubMenu}
			id="panel-run"
			type="radio" />
		<input
			class="panel-run sr-only"
			value=""
			bind:group={activeSubMenu}
			id="panel-cancel"
			type="radio" />
		<div data-name="texts" class="window texts">
			<div class="gb-textbox">
				<label class="text truncate" for="panel-menu"
					><span>Welcome to Nwp-studio</span>
				</label>
				<label class="text truncate" for="panel-menu"
					><span>Gameboy Battle Edition</span><span
						class="cursor-pointer font-bold ml-2 p-1 text-blue-800 uppercase"
						>Menu</span>
				</label>
			</div>
		</div>
		<div data-name="menu" class="window menu">
			<div class="gb-menu-compact">
				<label for="panel-fight" class="button fight">FIGHT</label>
				<label for="panel-pkmn" class="button pkmn"
					><sup>P</sup> <sub>K</sub> <sup>M</sup> <sub>N</sub>
				</label>
				<label for="panel-item" class="button item">ITEM</label>
				<label for="panel-run" class="button run">RUN</label>
			</div>
		</div>
		<header data-name="fight" class="window fight">
			<nav data-pg-name="GB_MENU" class="gb-menu">
				<button class="button detail" data-fight="move0">TACKLE</button>
				<button class="button detail" data-fight="move1">TAIL WHIP</button>
				<button class="button" disabled>-</button>
				<label for="panel-cancel" class="button back">cancel</label>
				<div class="fight-details window" data-pg-name="GB_DETAIL">
					<nav data-pg-name="GB_DET_PAN" class="gb-detail-panel">
						<span class="type-header">TYPE/</span>
						<span class="type">NORMAL</span>
					</nav>
				</div>
			</nav>
		</header>
		<header data-name="item" class="window item">
			<nav
				data-pg-class-style="gbmenu"
				class="grid gap-3 h-full"
				data-pg-name="GB_MENU">
				<div class="button potion">
					<span>POTION x</span><span class="potionCount">1</span>
				</div>
				<label for="panel-cancel" class="button back">cancel</label>
				<div class="opacity-0">3</div>
				<div class="opacity-0">4</div>
			</nav>
		</header>
		<header data-name="pkmn" class="pkmn window">
			<figure class="img-frame">
				<svg width="171" height="171" data-width="100%" data-height="auto">
					<use xlink:href="#pikachu_front" />
				</svg>
			</figure>
			<nav class="flex flex-wrap gap-3 p-2 absolute bottom-0 right-0">
				<label for="panel-cancel" class="button back">action</label>
				<label for="panel-cancel" class="button back">rest</label>
				<label for="panel-cancel" class="button back">cancel</label>
			</nav>
		</header>
		<header data-name="run" class="run window">
			<figure class="img-frame">
				<svg width="171" height="171" data-width="100%" data-height="auto">
					<use xlink:href="#eevee_front" />
				</svg>
			</figure>
			<nav class="grid grid-cols-2 gap-3 py-2 absolute bottom-0 right-0">
				<span />
				<label for="panel-cancel" class="button back">cancel</label>
			</nav>
		</header>
	</div>
</article>
