<script>
	import { player, logText, throwDice, opponent } from './battle'
	export let data
</script>

<article class="content">
	<div class="grid grid-cols-2 gap-4">
		<section class="p-6 rounded-box shadow-xl font-bold space-y-1">
			<header class="flex gap-4 items-center">
				<h3 class="text-2xl uppercase">{$player.name}</h3>
				<span class="flex-1" />
				<svg viewBox="0 0 11 4" height="16" width="44"
					><use xlink:href="#hp" /></svg>
				<span class="text-xl">{$player.health}</span>
			</header>
			<div class="flex gap-4 items-center">
				<span class="flex-1" />
				<svg viewBox="0 0 7 7" width="21" height="21"
					><use xlink:href="#ball_full" /></svg>
				<span class="font-bold"
					>{$player.hardAttackDice}/{$player.hardAttackDamage}</span>
			</div>
			<div class="flex gap-4 items-center">
				<span class="flex-1" />
				<svg viewBox="0 0 7 7" width="21" height="21"
					><use xlink:href="#ball_empty" /></svg>
				<span class="font-bold"
					>{$player.weakAttackDice}/{$player.weakAttackDamage}</span>
			</div>
			<footer>
				<progress
					class="progress"
					value={$player.health}
					max={$player.maxHealth} />
			</footer>
		</section>

		<section class="p-6 rounded-box shadow-xl font-bold space-y-1">
			<header class="flex gap-4 items-center">
				<h3 class="text-2xl uppercase">{$opponent.name}</h3>
				<span class="flex-1" />
				<svg viewBox="0 0 11 4" height="16" width="44"
					><use xlink:href="#hp" /></svg>
				<span class="text-xl">{$opponent.health}</span>
			</header>
			<div class="flex gap-4 items-center">
				<span class="flex-1" />
				<svg viewBox="0 0 7 7" width="21" height="21"
					><use xlink:href="#ball_full" /></svg>
				<span class="font-bold"
					>{$opponent.hardAttackDice}/{$opponent.hardAttackDamage}</span>
			</div>
			<div class="flex gap-4 items-center">
				<span class="flex-1" />
				<svg viewBox="0 0 7 7" width="21" height="21"
					><use xlink:href="#ball_empty" /></svg>
				<span class="font-bold"
					>{$opponent.weakAttackDice}/{$opponent.weakAttackDamage}</span>
			</div>
			<footer>
				<progress
					class="progress"
					value={$opponent.health}
					max={$opponent.maxHealth} />
			</footer>
		</section>

		<div class="join">
			<button class="btn join-item" on:click={() => player.takeDamage(2)}
				>Damage</button>
			<button class="btn join-item" on:click={() => player.resetHealth()}
				>Reset</button>
			<button class="btn join-item">Attack</button>
		</div>

		<div class="join">
			<button class="btn join-item" on:click={() => opponent.takeDamage(2)}
				>Damage</button>
			<button class="btn join-item" on:click={() => opponent.resetHealth()}
				>Reset</button>
			<button class="btn join-item">Attack</button>
		</div>
	</div>
</article>
