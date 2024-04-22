<script>
	import TextBox from './TextBox.svelte'
	import { text1, text2 } from './gb'
	export let textBool = false
	export let menuBool = false
</script>

<div class="windows">
	<input
		bind:checked={menuBool}
		class="sr-only"
		id="panel-menu"
		type="checkbox" />
	<input class="sr-only" id="panel-fight" type="checkbox" />
	<input class="sr-only" id="panel-item" type="checkbox" />
	<input class="sr-only" id="panel-pkmn" type="checkbox" />
	<input class="sr-only" id="panel-run" type="checkbox" />
	<footer data-name="texts" class="window texts">
		{#if textBool}
			<TextBox bind:text1={$text1} bind:text2={$text2} />
		{/if}
	</footer>
	<footer data-name="menu" class="window menu">
		<div class="grid grid-cols-2 gap-4 h-full">
			<label for="panel-fight" class="button fight">FIGHT</label>
			<label for="panel-pkmn" class="button pkmn">
				<sup>P</sup> <sub>K</sub> <sup>M</sup> <sub>N</sub>
			</label>
			<label for="panel-item" class="button item">ITEM</label>
			<label for="panel-run" class="button run">RUN</label>
		</div>
	</footer>
	<slot />
</div>
