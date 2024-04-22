<script>
	import { theme } from '$lib'
	const themes = [
		'light',
		'dark',
		'cupcake',
		'retro',
		'cyberpunk',
		'pastel',
		'wireframe',
		'dracula',
		'dim',
		'nord'
	]
</script>

<select
	class="select select-bordered w-full max-w-xs capitalize"
	bind:value={$theme}>
	{#each themes as theme}
		<option value={theme}>{theme}</option>
	{/each}
</select>
