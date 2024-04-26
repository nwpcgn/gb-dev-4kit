<script>
	// import { onMount, tick } from 'svelte'
	import { fly } from 'svelte/transition'
	import { quartOut } from 'svelte/easing'
	import { sleep } from '../'
	import { text1, text2, oppHp, playHp } from './'
	import PkmnProgress from './PkmnProgress.svelte'
	import TextBox from './TextBox.svelte'
	let theme = 'light'
	let typespeed = 1
	let activeSubMenu = ''
	let showBattle = false
	let showChatbox = false
	let showMenu = false
	let disableIntroAnimation = false
	function resetText() {
		const d1 = $text1.length / (typespeed * 0.01)
		const d2 = $text2.length / (typespeed * 0.01)
		text1.set(' ')
		text2.set(' ')
		return new Promise((resolve) => {
			const delay = Math.max(d1, d2) / 4
			setTimeout(resolve, delay + 10)
		})
	}
	async function logText(t1 = ' ', t2 = ' ') {
		const dura1 = t1.length / (typespeed * 0.01)
		const dura2 = t2.length / (typespeed * 0.01)
		await resetText()
		text1.set(t1)
		await sleep(dura1 * 1.25)
		text2.set(t2)
		await sleep(dura2 * 1.5)
		return [dura1, dura2]
	}

	const animatedLogText = async (t1 = ' ', t2 = ' ', gapdelay = 500) => {
		// let saveHp = [[$oppHp], [$playHp]]
		playHp.set(0)
		oppHp.set(0)
		await sleep(gapdelay)
		showChatbox = true
		await sleep(gapdelay)
		playHp.set(0.9)
		oppHp.set(0.85)
		let [dura1, dura2] = await logText(t1, t2)
		await sleep(gapdelay)
		text2.set(' ')
		await sleep(dura2 / 4)
		text1.set(' ')
		await sleep(dura1 / 4 + 100)
		showMenu = true
		return true
	}
	const playIntroAnimation = async () => {
		showChatbox = false
		showMenu = false
		if (showBattle) {
			showBattle = false
			await sleep(1800)
		}
		disableIntroAnimation = true
		showBattle = true
		await animatedLogText('Welcome to Nwp-studio', 'Gameboy Battle Edition')
		disableIntroAnimation = false
	}
	const changeBattleMode = async (event) => {
		if (!event.currentTarget.checked) {
			activeSubMenu = ''
			showMenu = false
			showChatbox = false
		}
	}
</script>

<aside class="absolute right-4 top-4 nwp-gb">
	<nav class="pkmn-ctrl">
		<label for="showBattle">
			<span>{showBattle ? 'End' : 'Start'} Battle</span>
			<input
				bind:checked={showBattle}
				class="toggle gb-stat-trigger-layer"
				id="showBattle"
				type="checkbox"
				on:change={changeBattleMode} />
		</label>
		<label for="showChatbox">
			<span class:opacity-20={!showBattle}
				>{showChatbox ? 'Hide' : 'Show'} Chatbox</span>
			<input
				bind:checked={showChatbox}
				class="toggle gb-stat-chat-box"
				id="showChatbox"
				type="checkbox"
				on:change={(e) => {
					if (!showChatbox) {
						activeSubMenu = ''
						showMenu = false
					} else {
						showBattle = true
					}
				}} />
		</label>
		<label for="showMenu">
			<span class:opacity-20={!showChatbox}
				>{showMenu ? 'Hide' : 'Show'} Menu</span>
			<input
				bind:checked={showMenu}
				class="gb-stat-menu toggle"
				disabled={!showChatbox}
				id="showMenu"
				type="checkbox"
				on:change={(e) => {
					if (!showMenu) {
						activeSubMenu = ''
					}
				}} />
		</label>
		{#if showMenu}
			<nav
				class="pkmn-ctrl"
				transition:fly={{
					duration: 400,
					x: 200,
					easing: quartOut,
					delay: 200
				}}>
				<label for="activeSubMenuFight">
					<span>Fight Menu</span>
					<input
						bind:group={activeSubMenu}
						class="gb-stat-fight radio"
						disabled={!showMenu}
						id="activeSubMenuFight"
						type="radio"
						value="fight" />
				</label>
				<label for="activeSubMenuItem">
					<span>Item Menu</span>
					<input
						bind:group={activeSubMenu}
						class="gb-stat-item radio"
						disabled={!showMenu}
						id="activeSubMenuItem"
						type="radio"
						value="item" />
				</label>
				<label for="activeSubMenuPkmn">
					<span>Pkmn Menu</span>
					<input
						bind:group={activeSubMenu}
						class="gb-stat-pkmn radio"
						disabled={!showMenu}
						type="radio"
						value="pkmn"
						id="activeSubMenuPkmn" />
				</label>
				<label for="activeSubMenuRun">
					<span>Run Menu</span>
					<input
						bind:group={activeSubMenu}
						class="gb-stat-run radio"
						disabled={!showMenu}
						type="radio"
						value="run"
						id="activeSubMenuRun" />
				</label>
				<label for="closeSubMenus">
					<span class="text-error">Close Sub Menu</span>
					<input
						bind:group={activeSubMenu}
						class="gb-stat-run radio radio-error"
						disabled={!showChatbox}
						id="closeSubMenus"
						type="radio"
						value="" />
				</label>
			</nav>
		{/if}
	</nav>
</aside>
<aside class="absolute right-4 bottom-4 nwp-gb">
	<nav class="flex ggap-1">
		<button
			class="btn btn-neutral btn-sm"
			disabled={disableIntroAnimation}
			on:click={playIntroAnimation}>Animate</button>
	</nav>
</aside>

<section class="gb4" data-theme={theme}>
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
					<PkmnProgress value={$oppHp} />
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
					<PkmnProgress value={$playHp} />
				</div>
				<div class="gb-balls"><!-- x --></div>
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
			class="panel-cancel sr-only"
			value=""
			bind:group={activeSubMenu}
			id="panel-cancel"
			type="radio" />
		<footer class="window texts">
			<div class="gb-textbox">
				<TextBox bind:text={$text1} />
				<TextBox bind:text={$text2} />
			</div>
		</footer>
		<footer class="window menu">
			<nav class="gb-menu-compact">
				<label for="panel-fight" class="button fight">FIGHT</label>
				<label for="panel-pkmn" class="button pkmn">
					<sup>P</sup> <sub>K</sub> <sup>M</sup> <sub>N</sub>
				</label>
				<label for="panel-item" class="button item">ITEM</label>
				<label for="panel-run" class="button run">RUN</label>
			</nav>
		</footer>
		<header class="window fight">
			<nav data-pg-name="GB_MENU" class="gb-menu">
				<button class="button detail" data-fight="move0">TACKLE</button>
				<button class="button detail" data-fight="move1">TAIL WHIP</button>
				<button class="button" disabled>-</button>
				<label for="panel-cancel" class="button back">cancel</label>
				<header class="fight-details window" data-pg-name="GB_DETAIL">
					<nav data-pg-name="GB_DET_PAN" class="gb-detail-panel">
						<span class="type-header">TYPE/</span>
						<span class="type">NORMAL</span>
					</nav>
				</header>
			</nav>
		</header>
		<header class="window item">
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
		<article class="pkmn window">
			<div class="flex justify-around py-2">
				<figure class="img-frame">
					<svg width="171" height="171">
						<use xlink:href="#pikachu_front" />
					</svg>
				</figure>
				<figure class="img-frame">
					<svg width="171" height="171">
						<use xlink:href="#red_front" />
					</svg>
				</figure>
			</div>
			<nav class="flex flex-wrap gap-3 p-2 absolute bottom-0 right-0">
				<label for="panel-cancel" class="button back">action</label>
				<label for="panel-cancel" class="button back">rest</label>
				<label for="panel-cancel" class="button back">cancel</label>
			</nav>
		</article>
		<article class="run window">
			<div class="flex justify-around">
				<figure class="img-frame">
					<svg width="171" height="171" data-width="100%" data-height="auto">
						<use xlink:href="#eevee_front" />
					</svg>
				</figure>

				<figure class="img-frame">
					<svg width="171" height="171" data-width="100%" data-height="auto">
						<use xlink:href="#blue_front" />
					</svg>
				</figure>
			</div>
			<nav class="grid grid-cols-2 gap-3 py-2 absolute bottom-0 right-0">
				<span />
				<label for="panel-cancel" class="button back">cancel</label>
			</nav>
		</article>
	</div>
</section>
