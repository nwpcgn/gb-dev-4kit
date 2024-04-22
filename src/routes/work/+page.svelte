<script>
	import Gameboy4 from '$lib/pokemon/Gameboy4.svelte'
	export let data
</script>

<svelte:head><title>{data.title}</title></svelte:head>

<Gameboy4 />
