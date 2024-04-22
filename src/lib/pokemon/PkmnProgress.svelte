<script>
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	export let max = 1
	export let value = 0
	const progress = tweened(0, {
		duration: 1000,
		easing: cubicOut
	})

	const updateValue = (int) => progress.set(int)

	$: updateValue(value)
</script>

<div>
	<progress class="progress" value={$progress} {max} />
</div>
