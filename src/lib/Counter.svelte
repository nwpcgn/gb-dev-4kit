<script>
	let count = 0

	$: if (count >= 10) {
		alert(`count is dangerously high!`)
		count = 9
	}

	function handleClick() {
		count += 1
	}
</script>

<button on:click={handleClick} class="btn btn-neutral btn-wide">
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
