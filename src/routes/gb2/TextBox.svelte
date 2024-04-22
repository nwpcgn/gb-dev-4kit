<script context="module">
	import { writable } from 'svelte/store'

	export const text1 = writable('')
	export const text2 = writable('')
</script>

<script>
	// export let text1 = '',
	// 	text2 = ''

	function typewriter(node, { speed = 1 }) {
		const valid =
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE

		if (!valid) {
			throw new Error(
				`This transition only works on elements with a single text node child`
			)
		}

		const text = node.textContent
		const duration = text.length / (speed * 0.01)

		return {
			duration,
			tick: (t) => {
				const i = ~~(text.length * t)
				node.textContent = text.slice(0, i)
			}
		}
	}
</script>

<div class="flex flex-col justify-around h-full">
	{#key $text1}
		<div
			class="text truncate"
			in:typewriter={{ speed: 1 }}
			out:typewriter={{ speed: 4 }}>
			{$text1}
		</div>
	{/key}
	{#key $text2}
		<div
			class="text truncate"
			in:typewriter={{ speed: 1 }}
			out:typewriter={{ speed: 4 }}>
			{$text2}
		</div>
	{/key}
</div>
