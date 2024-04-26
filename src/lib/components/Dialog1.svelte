<script>
	import { closeModal } from './Modal.svelte'
	import { clickOutside } from '../'
	import { onMount } from 'svelte'
	export let txt = ''
	export let heading = 'Nwp-Studio'
	let elem
	const handleKey = ({ key }) => key === 'Escape' && closeModal()
	onMount(() => {
		setTimeout(() => {
			elem.showModal()
		}, 100)
	})
</script>

<dialog bind:this={elem} class="modal">
	<div class="modal-box" use:clickOutside on:click_outside={closeModal}>
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
				<svg class="nwp-icon nwp-icon-20"><use xlink:href="#nwp-close" /></svg>
			</button>
		</form>
		<h3 class="font-bold text-lg">{heading}</h3>
		<p class="py-4">{txt}</p>
	</div>
</dialog>
