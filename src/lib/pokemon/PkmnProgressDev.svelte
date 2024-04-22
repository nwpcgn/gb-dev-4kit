<script>
	import PkmnProgress from './PkmnProgress.svelte'
	const btnStyle = 'btn btn-sm btn-neutral'
	let value = 0

	function upVal(int) {
		value = int
	}
</script>

<section class="grid gap-1">
	<PkmnProgress bind:value max={1} />
	<nav class="flex gap-1">
		<button on:click={() => upVal(0)} class={btnStyle}> 0% </button>
		<button on:click={() => upVal(0.25)} class={btnStyle}> 25% </button>
		<button on:click={() => upVal(0.5)} class={btnStyle}> 50% </button>
		<button on:click={() => upVal(0.75)} class={btnStyle}> 75% </button>
		<button on:click={() => upVal(1)} class={btnStyle}> 100% </button>
		<slot />
	</nav>
</section>
