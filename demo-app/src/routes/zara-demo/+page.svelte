<script lang="ts">
	import { Block } from '$lib/components';
	import { Blockchain } from '$lib/blockchain';
	import { ZARA_SWEATSHIRT_STEPS } from '$lib/blockchain/demo_zara.ts';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import type { Block as BlockType } from '$lib/blockchain/types/types.ts';
	import ZaraLogo from '$lib/assets/Zara_(retailer)-Logo.wine.svg';

	// Create blockchain and load Zara demo data
	const blockchain = new Blockchain();
	let blocks: BlockType[] = $state([]);
	let isLoading = $state(true);

	// Load Zara demo data into blockchain
	async function loadZaraDemo() {
		try {
			// Create genesis block
			const genesisBlock = await blockchain.createGenesisBlock();
			const loadedBlocks: BlockType[] = [genesisBlock.toJSON()];

			// Add all Zara steps as blocks
			for (const stepData of ZARA_SWEATSHIRT_STEPS) {
				const newBlock = await blockchain.addBlock(stepData);
				loadedBlocks.push(newBlock.toJSON());
			}

			blocks = loadedBlocks;
			isLoading = false;
		} catch (error) {
			console.error('Failed to load Zara demo:', error);
			alert('Failed to load Zara demo: ' + (error instanceof Error ? error.message : String(error)));
			isLoading = false;
		}
	}

	// Load on mount
	loadZaraDemo();
</script>

<svelte:head>
	<title>Zara Supply Chain Demo - Verifiable Origin Tracking | Blockchain Transparency</title>
	<meta name="description" content="Live demonstration of verifiable supply chain tracking. See how blockchain proves origin, transport routes, and sustainability claims for a Zara garment from farm to store." />
</svelte:head>

<div class="container mx-auto p-6 max-w-7xl">
	<!-- Header -->
	<div class="mb-12">
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
			<div class="flex items-center gap-4">
				<img src={ZaraLogo} alt="Zara Logo" class="h-16 w-auto" />
			</div>
			<Button variant="outline" onclick={() => goto('/')} class="gap-2 self-start sm:self-auto">
				← Back to Home
			</Button>
		</div>

		<!-- Demo Introduction -->
		<div class="bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 rounded-2xl border-2 border-primary/10 p-8 mb-8">
			<h1 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">
				Verifiable Fashion Supply Chain
			</h1>
			<p class="text-lg text-muted-foreground mb-4 leading-relaxed">
				This live demonstration showcases how blockchain enables <span class="font-semibold text-foreground">third-party verified tracking</span> of a Zara sweatshirt through its entire supply chain journey. Each block represents a verifiable step with cryptographic proof of origin, transport routes, and processing details.
			</p>
			<div class="flex flex-wrap gap-3 text-sm">
				<div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20">
					<span class="flex h-2 w-2 rounded-full bg-green-600"></span>
					<span class="font-medium">7 Verified Steps</span>
				</div>
				<div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
					<span class="flex h-2 w-2 rounded-full bg-blue-600"></span>
					<span class="font-medium">Immutable Records</span>
				</div>
				<div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">
					<span class="flex h-2 w-2 rounded-full bg-purple-600"></span>
					<span class="font-medium">Carbon Footprint Tracked</span>
				</div>
			</div>
		</div>

		<!-- What You'll See -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
			<div class="bg-card rounded-xl border p-5">
				<h3 class="font-semibold text-foreground mb-2 text-sm">Origin Verification</h3>
				<p class="text-xs text-muted-foreground leading-relaxed">
					See cryptographic proof of where raw materials originated, with timestamps and geographic data
				</p>
			</div>
			<div class="bg-card rounded-xl border p-5">
				<h3 class="font-semibold text-foreground mb-2 text-sm">Transport Routes</h3>
				<p class="text-xs text-muted-foreground leading-relaxed">
					Track each logistics step with verified handlers, locations, and transportation methods
				</p>
			</div>
			<div class="bg-card rounded-xl border p-5">
				<h3 class="font-semibold text-foreground mb-2 text-sm">Processing Documentation</h3>
				<p class="text-xs text-muted-foreground leading-relaxed">
					View manufacturing, quality checks, and certifications at every stage
				</p>
			</div>
		</div>
	</div>

	{#if isLoading}
		<div class="flex items-center justify-center p-12">
			<div class="text-muted-foreground">Loading Zara demo blockchain...</div>
		</div>
	{:else if blocks.length === 0}
		<div class="flex flex-col items-center justify-center p-12 space-y-4">
			<div class="text-muted-foreground text-lg">Failed to load demo data</div>
		</div>
	{:else}
		<div class="flex flex-col items-center space-y-0 w-full">
			{#each blocks as block, index (block.hash)}
				<div class="flex flex-col items-center w-full">
					<Block block={block} />
					{#if index < blocks.length - 1}
						<!-- Connector line between blocks -->
						<div class="flex flex-col items-center my-2">
							<div class="w-1 h-12 bg-primary/40"></div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

