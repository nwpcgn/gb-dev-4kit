<script>
	export let text = ' '
	$: if (!text) text = ' '

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

<div class="flex">
	{#key text}
		<div
			class="text"
			in:typewriter={{ speed: 1 }}
			out:typewriter={{ speed: 4 }}>
			{text}
		</div>
	{/key}
	<div class="opacity-0">0</div>
</div>
