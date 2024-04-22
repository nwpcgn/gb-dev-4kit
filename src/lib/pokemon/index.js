import { writable, derived } from 'svelte/store'

export const text1 = writable(' ')
export const text2 = writable(' ')
export const oppHp = writable(1)
export const playHp = writable(1)
export const game = deriveObject({
	opponent: { hp: oppHp },
	player: { hp: playHp }
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
