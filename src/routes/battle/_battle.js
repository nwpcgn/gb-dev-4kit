
function addLog(params) {
	console.log('Add Log', params)
}
function throwDice(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

let playerPoints = 'player_points'
let playerHealthBar = 'player_bar'

let enemys = [
	{
		name: '👾 Goblin Warrior',
		health: 12,
		maxHealth: 12,
		pointsId: 'enemy_points',
		healthbarId: 'enemy_bar',
		hardAttackDamage: 4,
		hardAttackDice: 8,
		weakAttackDamage: 2,
		weakAttackDice: 3
	}
]
let player = {
	name: '🧝‍♂️ Elf Knight',
	health: 30,
	maxHealth: 30,
	pointsId: 'player_points',
	healthbarId: 'player_bar',
	hardAttackDamage: 4,
	hardAttackDice: 8,
	weakAttackDamage: 2,
	weakAttackDice: 3,
	attacks: [
		[
			'Shield Bash',
			2,
			3,
			'🛡️ You are trying to bash the opponent away with your shield ...',
			'💫 The enemy dodges your attack ...'
		],
		[
			'Mace Attack',
			6,
			6,
			'🔨 You are trying hit the enemy with a huge mace ...',
			'💫 The enemy dodges your attack ...'
		],
		[
			'Magic Attack',
			1,
			4,
			'🌀 You are trying to cast a spell on your opponent ...',
			'💫 The enemy dodges your attack ...'
		]
	],
	attackLabel: ['Name', 'Damage', 'Dicer', 'Info', 'Failed']
}

let turn = 1

let playerHealth = 30
let playerHealthMax = 30
let playerPercent = '100%'
let playerName = ''
let enemyName = ''
let enemyHealth = 30
let enemyHealthMax = 30
let enemyPercent = '100%'

let roundCount = '⌛ Turn'
let locked

function opponent(
	name,
	health,
	maxHealth,
	pointsId,
	healthbarId,
	hardAttackDamage,
	hardAttackDice,
	weakAttackDamage,
	weakAttackDice
) {
	this.name = name
	this.health = health
	this.maxHealth = maxHealth
	this.pointsId = pointsId
	this.healthbarId = healthbarId
	this.attack = async function () {
		let x = throwDice(1, 10)
		let attackMessage = name + ' attempt to attack...'
		logText(attackMessage, 'primary')
		await sleep(1000)
		if (x >= hardAttackDice) {
			damageTaken('attacke', 'enemyBox')
			playerHealth = playerHealth - hardAttackDamage
			healthBarUpdateA(
				playerHealth,
				playerHealthMax,
				playerPoints,
				playerHealthBar
			)
			// logText('The enemy waves his spear at you');
			let damageText =
				'⚔️ You take ' + hardAttackDamage + ' points of critical damage'
			logText(damageText, 'warning')
			damageTaken('damages', 'playerBox')
		} else if (x > weakAttackDice && x < hardAttackDice) {
			damageTaken('attacke', 'enemyBox')
			playerHealth = playerHealth - weakAttackDamage
			healthBarUpdateA(
				playerHealth,
				playerHealthMax,
				playerPoints,
				playerHealthBar
			)
			// logText('The enemy charges at you with a spear');
			let damageText = '⚔️ You take ' + weakAttackDamage + ' points of damage'
			logText(damageText, 'warning')
			damageTaken('damages', 'playerBox')
		} else {
			logText('💫 The opponent stumbles over his own feet', 'success')
			damageTaken('attacke', 'enemyBox')
			damageTaken('playermiss', 'playerBox')
		}
	}
}

//Enemies
let goblin = new opponent(
	'👾 Goblin Warrior',
	12,
	12,
	'enemy_points',
	'enemy_bar',
	4,
	8,
	2,
	3
)

let playerAttacks = player.attacks

function logText(string, type = 'warning') {
	addLog({ message: string, type, dismissible: true, timeout: 9000 })
}

function turnCounterUpdate(turn) {
	roundCount = '⌛ Turn ' + turn
	logText(roundCount, 'dark')
}

async function damageTaken(animationClass, targetId) {
	// console.log("Animate Damage Player", animationClass, targetId);
	await sleep(500)
	console.error('Animate class: ', animationClass, targetId)
}

function lockActionButtons(condition) {
	locked = condition
}

function healthBarUpdateA(
	objectHealth,
	objectHealthMax,
	pointsClass,
	healthBar
) {
	let x = (objectHealth / objectHealthMax) * 100
	playerPercent = x.toFixed() + '%'
}

function healthBarUpdateB(
	objectHealth,
	objectHealthMax,
	pointsClass,
	healthBar
) {
	let x = (objectHealth / objectHealthMax) * 100 // x = 10 * objectHealth;
	enemyPercent = x.toFixed() + '%'
	enemyHealth = objectHealth
}

function resetHealth() {
	turn = 0
	logText('-------------------')
	logText('RESET')
	logText('-------------------')
	goblin.health = goblin.maxHealth
	healthBarUpdateB(
		goblin.health,
		goblin.maxHealth,
		goblin.pointsId,
		goblin.healthbarId
	)
	playerHealth = playerHealthMax
	healthBarUpdateA(playerHealth, playerHealthMax, playerPoints, playerHealthBar)
}

function sleep(ms = 10) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

async function weaponAttack(
	attackDescription,
	successDice,
	damage,
	missDescription
) {
	// console.log('weaponAttack(successDice, damage)', successDice, damage)

	lockActionButtons(true)
	turn = turn + 1
	let x = throwDice(1, 10)
	let _del = throwDice(100, 900)
	await sleep(1000 + _del)

	if (goblin.health > 0) {
		logText(attackDescription, 'info')
		await sleep(1000)
		damageTaken('swing', 'playerBox')
		if (x > successDice) {
			goblin.health = goblin.health - damage
			damageTaken('damages', 'enemyBox')
			healthBarUpdateB(
				goblin.health,
				goblin.maxHealth,
				goblin.pointsId,
				goblin.healthbarId
			)
			let damagedeal =
				'⚔️ You successfully deal ' +
				damage +
				' points of damage to the opponent'
			logText(damagedeal, 'success')
		} else {
			logText(missDescription, 'danger')
			damageTaken('enemymiss', 'enemyBox')
		}
		await sleep(1000)
		if (goblin.health > 0) {
			goblin.attack()
		} else {
			logText('☠️ Creatura is dead', 'danger')
		}
		await sleep(2000)
		turnCounterUpdate(turn)
		lockActionButtons(false)
	} else {
		logText('☠️ Creatura is dead', 'danger')
		lockActionButtons(false)
	}

	await sleep(1000)
	lockActionButtons(false)
}

const attacFuncA = () =>
	weaponAttack(
		playerAttacks[0][3],
		playerAttacks[0][2],
		playerAttacks[0][1],
		playerAttacks[0][4]
	)

const attacFuncB = () =>
	weaponAttack(
		playerAttacks[1][3],
		playerAttacks[1][2],
		playerAttacks[1][1],
		playerAttacks[1][4]
	)

const attacFuncC = () =>
	weaponAttack(
		playerAttacks[2][3],
		playerAttacks[2][2],
		playerAttacks[2][1],
		playerAttacks[2][4]
	)

const attackCtrs = [
	['🛡️ Shield Bash', attacFuncA],
	['🔨 Mace Attack', attacFuncB],
	['🌀 Magic Attack', attacFuncC]
]
const initPlayers = (id = 0) => {
	enemyHealth = goblin.health
	enemyHealthMax = goblin.maxHealth
	enemyPercent = '100%'
	enemyName = goblin.name
	playerHealth = player.health
	playerHealthMax = player.maxHealth
	playerName = player.name
	playerPercent = '100%'
	playerAttacks = player.attacks
}
const init = () => {
	console.log('Engine mounted!')
	initPlayers()
	turnCounterUpdate(turn)
}
