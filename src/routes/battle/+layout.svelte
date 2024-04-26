<script>
	export let data
</script>

<svelte:head><title>battle-{data.title}</title></svelte:head>

<section class="layer flex flex-col">
	<header class="content">
		<header class="nwp-header">
			<h1>{data.name}</h1>
			<div class="flex items-center gap-2">
				<a href="/battle" class="btn btn-neutral btn-sm"> Battle </a>
				<a href="/battle/v1" class="btn btn-neutral btn-sm"> Battle V1 </a>
			</div>
		</header>
	</header>
	<article class="flex-1">
		<slot />
	</article>
</section>
