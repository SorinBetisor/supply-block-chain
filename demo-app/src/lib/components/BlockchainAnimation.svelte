<script lang="ts">
	import { onMount } from 'svelte';
	import { Lock } from '@lucide/svelte';

	let stage = $state<'blocks' | 'transition' | 'network'>('blocks');
	let blockCount = $state(0);
	let showLocks = $state(false);
	let intervalId: number | null = null;

	function startAnimation() {
		// Stage 1: Add blocks one by one
		intervalId = setInterval(() => {
			if (blockCount < 4) {
				blockCount++;
			} else {
				if (intervalId) clearInterval(intervalId);
				// Show locks after brief pause
				setTimeout(() => {
					showLocks = true;
					// Transition to network view
					setTimeout(() => {
						stage = 'transition';
						setTimeout(() => {
							stage = 'network';
							// Hold on network view, then reset and loop
							setTimeout(() => {
								blockCount = 0;
								showLocks = false;
								stage = 'blocks';
								startAnimation();
							}, 3500);
						}, 600);
					}, 1000);
				}, 500);
			}
		}, 650);
	}

	onMount(() => {
		startAnimation();
		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});
</script>

<div class="relative w-full h-full flex items-center justify-center overflow-hidden">
	{#if stage === 'blocks' || stage === 'transition'}
		<!-- Blockchain Blocks View -->
		<div
			class="flex flex-col items-center gap-4 transition-all duration-1000"
			class:scale-50={stage === 'transition'}
			class:opacity-0={stage === 'transition'}
		>
			{#each Array(blockCount) as _, i}
				<div class="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-500">
					<!-- Block -->
					<div class="relative bg-card border-2 border-primary rounded-lg p-4 w-48 shadow-sm">
						<div class="flex items-center justify-between mb-2">
							<span class="text-xs font-bold text-primary">Block {i + 1}</span>
							{#if showLocks}
								<div class="animate-in zoom-in duration-300">
									<Lock class="h-4 w-4 text-primary" />
								</div>
							{/if}
						</div>
						<div class="space-y-1">
							<div class="h-2 bg-muted rounded w-full"></div>
							<div class="h-2 bg-muted rounded w-3/4"></div>
							<div class="h-2 bg-muted rounded w-5/6"></div>
						</div>
						<div class="mt-2 text-[10px] text-muted-foreground font-mono">
							Hash: {Math.random().toString(36).substring(2, 10)}...
						</div>
					</div>

					{#if i < blockCount - 1}
						<!-- Connecting Line -->
						<div class="w-0.5 h-6 bg-primary/40 my-1"></div>
						<!-- Chain Link Icon -->
						<div class="w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
							<div class="w-2 h-2 rounded-full bg-primary"></div>
						</div>
						<div class="w-0.5 h-6 bg-primary/40 my-1"></div>
					{/if}
				</div>
			{/each}
		</div>
	{:else if stage === 'network'}
		<!-- Network Graph View -->
		<div class="absolute inset-0 flex items-center justify-center animate-in zoom-in fade-in duration-1000">
			<svg class="w-full h-full" viewBox="0 0 400 300">
				<!-- Network connections -->
				<g class="opacity-40">
					<line x1="100" y1="150" x2="200" y2="80" stroke="currentColor" stroke-width="1" class="text-primary" />
					<line x1="100" y1="150" x2="200" y2="220" stroke="currentColor" stroke-width="1" class="text-primary" />
					<line x1="200" y1="80" x2="300" y2="100" stroke="currentColor" stroke-width="1" class="text-primary" />
					<line x1="200" y1="80" x2="300" y2="150" stroke="currentColor" stroke-width="1" class="text-primary" />
					<line x1="200" y1="220" x2="300" y2="150" stroke="currentColor" stroke-width="1" class="text-primary" />
					<line x1="200" y1="220" x2="300" y2="200" stroke="currentColor" stroke-width="1" class="text-primary" />
					<line x1="300" y1="100" x2="350" y2="120" stroke="currentColor" stroke-width="1" class="text-primary" />
					<line x1="300" y1="150" x2="350" y2="120" stroke="currentColor" stroke-width="1" class="text-primary" />
					<line x1="300" y1="200" x2="350" y2="180" stroke="currentColor" stroke-width="1" class="text-primary" />
					<line x1="50" y1="120" x2="100" y2="150" stroke="currentColor" stroke-width="1" class="text-primary" />
					<line x1="50" y1="180" x2="100" y2="150" stroke="currentColor" stroke-width="1" class="text-primary" />
				</g>

				<!-- Network nodes -->
				<g>
					<!-- Genesis node (larger) -->
					<circle cx="100" cy="150" r="8" fill="currentColor" class="text-primary animate-pulse" />

					<!-- Level 1 nodes -->
					<circle cx="200" cy="80" r="6" fill="currentColor" class="text-primary" opacity="0.8" />
					<circle cx="200" cy="220" r="6" fill="currentColor" class="text-primary" opacity="0.8" />

					<!-- Level 2 nodes -->
					<circle cx="300" cy="100" r="6" fill="currentColor" class="text-primary" opacity="0.6" />
					<circle cx="300" cy="150" r="6" fill="currentColor" class="text-primary" opacity="0.6" />
					<circle cx="300" cy="200" r="6" fill="currentColor" class="text-primary" opacity="0.6" />

					<!-- Level 3 nodes -->
					<circle cx="350" cy="120" r="5" fill="currentColor" class="text-primary" opacity="0.5" />
					<circle cx="350" cy="180" r="5" fill="currentColor" class="text-primary" opacity="0.5" />

					<!-- Origin nodes -->
					<circle cx="50" cy="120" r="5" fill="currentColor" class="text-primary" opacity="0.5" />
					<circle cx="50" cy="180" r="5" fill="currentColor" class="text-primary" opacity="0.5" />
				</g>
			</svg>

			<!-- Scale indicator -->
			<div class="absolute bottom-4 right-4 text-xs text-muted-foreground font-mono bg-card/80 backdrop-blur px-3 py-1.5 rounded border border-border">
				1000+ verified chains
			</div>
		</div>
	{/if}
</div>
