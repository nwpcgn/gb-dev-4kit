<!--
    The actual Modal wrapper is kept seperate from the Modal 'manager' to prevent circular dependencies.
-->
<script>
	export let isOpen
	export let payload
</script>

{#if $payload.length && $isOpen}
	{#each $payload as { component, props }, modalIndex}
		<svelte:component this={component} {...props} {modalIndex} />
	{/each}
{/if}
