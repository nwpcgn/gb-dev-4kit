import { writable, derived } from 'svelte/store'

const enemyObj = {
	name: 'Eevee',
	health: 30,
	maxHealth: 30,
	hardAttackDamage: 5,
	hardAttackDice: 5,
	weakAttackDamage: 3,
	weakAttackDice: 3
}

const playObj = {
	name: 'Pikachu',
	health: 30,
	maxHealth: 30,
	hardAttackDamage: 5,
	hardAttackDice: 5,
	weakAttackDamage: 3,
	weakAttackDice: 3,
	attacks: {
		mace: {
			name: 'Mace Attack',
			damage: 6,
			dice: 3,
			msg: 'You are trying hit the enemy with a huge mace ...',
			txt: 'The enemy dodges your attack ...'
		},
		shield: {
			name: 'Shield Bash',
			damage: 3,
			dice: 3,
			msg: 'You are trying to bash the opponent away with your shield',
			txt: 'The enemy dodges your attack ...'
		}
	}
}

function oppHp() {
	const { subscribe, set, update } = writable(enemyObj)

	return {
		subscribe,
		switch: (obj) =>
			update((n) => {
				return { ...n, ...obj }
			}),
		takeDamage: (num) =>
			update((n) => {
				n.health -= num
				if (n.health < 0) {
					n.health = 0
				}
				return n
			}),
		resetHealth: () =>
			update((n) => {
				n.health = n.maxHealth
				return n
			})
	}
}

export const opponent = oppHp()

function playHp() {
	const { subscribe, set, update } = writable(playObj)

	return {
		subscribe,
		switch: (obj) =>
			update((n) => {
				return { ...n, ...obj }
			}),
		takeDamage: (num) =>
			update((n) => {
				n.health -= num
				if (n.health < 0) {
					n.health = 0
				}
				return n
			}),
		resetHealth: () =>
			update((n) => {
				n.health = n.maxHealth
				return n
			})
	}
}

export const player = playHp()

export function logText(params, type) {
	console.log(params, type)
}

export function throwDice(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

// export let data = {
// 	enemy: {
// 		name: 'Goblin Warrior',
// 		health: 30,
// 		maxHealth: 30,
// 		hardAttackDamage: 5,
// 		hardAttackDice: 5,
// 		weakAttackDamage: 3,
// 		weakAttackDice: 3
// 	},
// 	player: {
// 		name: 'Elf Warrior',
// 		health: 30,
// 		maxHealth: 30,
// 		hardAttackDamage: 5,
// 		hardAttackDice: 5,
// 		weakAttackDamage: 3,
// 		weakAttackDice: 3,
// 		attacks: {
// 			mace: {
// 				name: 'Mace Attack',
// 				damage: 6,
// 				dice: 3,
// 				msg: 'You are trying hit the enemy with a huge mace ...',
// 				txt: 'The enemy dodges your attack ...'
// 			},
// 			shield: {
// 				name: 'Shield Bash',
// 				damage: 3,
// 				dice: 3,
// 				msg: 'You are trying to bash the opponent away with your shield',
// 				txt: 'The enemy dodges your attack ...'
// 			}
// 		}
// 	}
// }
// export class Fighter {
// 	constructor(
// 		name,
// 		health = 30,
// 		maxHealth = 30,
// 		hardAttackDamage = 6,
// 		hardAttackDice = 5,
// 		weakAttackDamage = 2,
// 		weakAttackDice = 3,
// 		attacks = {}
// 	) {
// 		this.name = name
// 		this.health = health
// 		this.maxHealth = maxHealth
// 		this.hardAttackDamage = hardAttackDamage
// 		this.hardAttackDice = hardAttackDice
// 		this.weakAttackDamage = weakAttackDamage
// 		this.weakAttackDice = weakAttackDice
// 		this.attacks = attacks
// 	}

// 	get hp() {
// 		return this.health
// 	}

// 	set hp(num = 0) {
// 		if (typeof num == 'number') {
// 			this.health -= num
// 			if (this.health < 0) {
// 				this.health = 0
// 			}
// 		} else {
// 			console.log('hp is not a number', num)
// 		}
// 	}

// 	attackList() {
// 		return this.attacks
// 	}

// 	addAttack(slug, object) {
// 		if (typeof slug == 'string' && typeof object == 'object') {
// 			this.attacks[slug] = object
// 		}
// 	}

// 	weaponAttack(slug = 'mace') {
// 		if (this.attacks[slug]) {
// 			let x = throwDice(1, 10)
// 			if (x > this.attacks[slug].dice) {
// 				enemy.hp = this.attacks[slug].damage
// 				console.log('SUCCESS', enemy.hp)
// 			} else {
// 				alert('fail' + x)
// 			}
// 			console.log(this.attacks[slug])
// 		}
// 	}
// }

// export let player = new Fighter(
// 	data.player.name,
// 	data.player.health,
// 	data.player.maxHealth,
// 	data.player.hardAttackDamage,
// 	data.player.hardAttackDice,
// 	data.player.weakAttackDamage,
// 	data.player.weakAttackDice,
// 	data.player.attacks
// )

// export let enemy = new Fighter(
// 	data.enemy.name,
// 	data.enemy.health,
// 	data.enemy.maxHealth,
// 	data.enemy.hardAttackDamage,
// 	data.enemy.hardAttackDice,
// 	data.enemy.weakAttackDamage,
// 	data.enemy.weakAttackDice
// )
/*
let player = new Fighter(
  data.player.name,
  data.player.health,
  data.player.maxHealth,
  data.player.hardAttackDamage,
  data.player.hardAttackDice,
  data.player.weakAttackDamage,
  data.player.weakAttackDice,
  data.attacks
);

let enemy = new Fighter(
  data.enemy.name,
  data.enemy.health,
  data.enemy.maxHealth,
  data.enemy.hardAttackDamage,
  data.enemy.hardAttackDice,
  data.enemy.weakAttackDamage,
  data.enemy.weakAttackDice
); */
