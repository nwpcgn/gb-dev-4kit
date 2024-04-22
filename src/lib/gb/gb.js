import { writable, derived } from 'svelte/store'

export const text1 = writable('')
export const text2 = writable('')
export const gbWidth = writable(500)
export const gbHeight = writable(500)
export const gbX = writable(0)
export const gbY = writable(0)

export const gb = deriveObject({
	width: gbWidth,
	height: gbHeight,
	x: gbX,
	y: gbY
})

function deriveObject(obj) {
	const keys = Object.keys(obj)
	const list = keys.map((key) => {
		return obj[key]
	})
	return derived(list, (array) => {
		return array.reduce((dict, value, i) => {
			dict[keys[i]] = value
			return dict
		}, {})
	})
}
