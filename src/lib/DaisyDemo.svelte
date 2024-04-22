<script>
	export let wrapperClass = ''
	let showDemo = false
</script>

<div class={wrapperClass}>
	<details class="collapse bg-base-200" bind:open={showDemo}>
		<summary class="collapse-title text-xl font-medium"
			>{showDemo ? 'Hide' : 'Show'} Demo</summary>
		<div class="collapse-content">
			<div class="py-4">
				<button class="btn btn-primary">primary</button>
				<button class="btn btn-secondary">secondary</button>
				<button class="btn btn-accent">accent</button>
			</div>

			<div class="bg-base-300 card my-4 rounded-box">
				<div class="flex items-center justify-around py-4">
					<span class="loading loading-spinner loading-xs" /><span
						class="loading loading-spinner loading-sm" /><span
						class="loading loading-ring loading-md" /><span
						class="loading loading-ring loading-lg" /><span
						class="loading loading-dots loading-md" /><span
						class="loading loading-dots loading-lg" />
				</div>
			</div>
			<div class="py-4 space-y-4">
				<div role="alert" class="alert">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-info shrink-0 w-6 h-6">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>we use cookies for no reason.</span>
					<div>
						<button class="btn btn-sm">Deny</button>
						<button class="btn btn-sm btn-primary">Accept</button>
					</div>
				</div>
			</div>
		</div>
	</details>
</div>
