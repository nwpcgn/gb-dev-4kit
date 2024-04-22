import { writable, derived } from 'svelte/store'

export const theme = writable('dim')
export const stage = writable()
export const canvas = derived(stage, ($stage, set) => {
	if (!$stage) return
	const ro = new ResizeObserver(([entry]) => {
		let width = Math.floor(entry.contentRect.width),
			height = Math.floor(entry.contentRect.height),
			offsetY = Math.floor(entry.contentRect.top)
		set({ width, height, offsetY })
	})
	ro.observe($stage)
	return () => ro.disconnect()
})

export default stage
