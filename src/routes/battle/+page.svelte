<script>
	import Notification1 from '$lib/components/Notification1.svelte'
	import Dialog1 from '$lib/components/Dialog1.svelte'
	import { openModal } from '$lib/components/Modal.svelte'
	import {
		addNotification,
		setMaxNumberOfNotifications
	} from '$lib/components/Notifications.svelte'
	import DocModal from './r2/modal.svx'
	import DocNotes from './r2/notes.svx'
	import TabControl from '$lib/components/TabControl.svelte'
	import TabControlItem from '$lib/components/TabControlItem.svelte'
	export let data
	let enabledC = false

	function welcome() {
		openModal(Dialog1, {
			heading: 'Nwp-Studio',
			txt: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse qui iure quae aperiam explicabo voluptatum quidem sit facilis rerum facere fuga ab, enim dolore error autem sunt placeat? Quis, magni!'
		})
	}

	let i = 0
	let maxN = 1
	const handleClick = (type = '') => {
		i++
		addNotification(Notification1, { i, type })
	}

	let arr = [1, 2, 3, 4]

	$: {
		setMaxNumberOfNotifications(maxN)
	}
</script>

<article class="content">
	<TabControl let:controls>
		<div class="tabs tabs-bordered" slot="tabs" let:tabs>
			{#each tabs as tab}
				<button
					class="tab"
					on:click={tab.select}
					disabled={tab.disabled}
					class:tab-active={tab.active}>
					{tab.props.title}
				</button>
			{/each}
		</div>

		<div class="mt-4 relative">
			<TabControlItem id="A" title="Modal" active>
				<header class="nwp-header">
					<h3>Dialog / Modal</h3>
				</header>
				<nav>
					<button on:click={welcome} class="btn btn-sm">Open Dialog</button>
					<!-- <button class="btn btn-sm" on:click={() => controls.set('B')}
						>Notifications</button> -->
				</nav>

				<article class="p-4 mt-24 prose lg:prose-xl">
					<DocModal />
				</article>
			</TabControlItem>
			<TabControlItem id="B" title="Notification">
				<div class="flex items-center justify-between">
					<div class="text-lg">Max Notes</div>
					<aside class="flex gap-4 py-2">
						{#each arr as item}
							<label class="grid gap-1 place-items-center">
								<span>{item}</span>
								<input
									type="radio"
									bind:group={maxN}
									value={item}
									class="radio" />
							</label>
						{/each}
					</aside>
				</div>

				<nav>
					<button
						class="btn btn-sm btn-error"
						on:click={() => handleClick('alert-error')}>Error Note</button>
					<button
						class="btn btn-sm btn-info"
						on:click={() => handleClick('alert-info')}>Info Note</button>
					<button
						class="btn btn-sm btn-warning"
						on:click={() => handleClick('alert-warning')}>Warning Note</button>
					<button
						class="btn btn-sm btn-success"
						on:click={() => handleClick('alert-success')}>Success Note</button>
				</nav>
				<article class="p-4 mt-24 prose lg:prose-xl">
					<DocNotes />
				</article>
			</TabControlItem>
			<TabControlItem id="C" title="Tab C">
				<nav>
					<button
						class="btn btn-sm btn-error"
						on:click={() => handleClick('alert-error')}>Error Note</button>
					<button
						class="btn btn-sm btn-info"
						on:click={() => handleClick('alert-info')}>Info Note</button>
					<button
						class="btn btn-sm btn-warning"
						on:click={() => handleClick('alert-warning')}>Warning Note</button>
					<button
						class="btn btn-sm btn-success"
						on:click={() => handleClick('alert-success')}>Success Note</button>
				</nav>
			</TabControlItem>
		</div>
	</TabControl>
</article>
