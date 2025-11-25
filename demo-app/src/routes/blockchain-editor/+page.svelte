<script lang="ts">
	import { goto } from '$app/navigation';
	import { Blockchain } from '$lib/blockchain';
	import type { Block as BlockType, SupplyChainStepData } from '$lib/blockchain/types/types.ts';
	import { Block } from '$lib/components';
	import AddBlockForm from '$lib/components/AddBlockForm.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	// Create a sample blockchain for demo
	const blockchain = new Blockchain();

	let blocks: BlockType[] = $state([]);
	let dialogOpen = $state(false);

	// Generate genesis block
	async function generateGenesis() {
		try {
			const block = await blockchain.createGenesisBlock();
			blocks = [block.toJSON()];
		} catch (error) {
			console.error('Failed to create genesis block:', error);
			alert('Failed to create genesis block: ' + (error instanceof Error ? error.message : String(error)));
		}
	}

	// Handle adding a new block
	async function handleAddBlock(data: SupplyChainStepData) {
		try {
			const newBlock = await blockchain.addBlock(data);
			blocks = [...blocks, newBlock.toJSON()];
			dialogOpen = false;
		} catch (error) {
			console.error('Failed to add block:', error);
			alert('Failed to add block: ' + (error instanceof Error ? error.message : String(error)));
		}
	}

	function handleCancel() {
		dialogOpen = false;
	}
</script>

<svelte:head>
	<title>Blockchain Editor - Build Custom Supply Chain | Verifiable Origin Tracking</title>
	<meta name="description" content="Interactive blockchain editor for supply chain tracking. Build your own verifiable supply chain with cryptographic proof of origin, transport routes, and processing steps." />
</svelte:head>

<div class="container mx-auto p-4 sm:p-6 max-w-7xl">
	<div class="mb-8">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
			<div>
				<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">Blockchain Supply Chain Editor</h1>
				<p class="text-sm sm:text-base text-muted-foreground">Build your own verifiable supply chain with cryptographic proof</p>
			</div>
			<div class="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
				<Button variant="outline" onclick={() => goto('/')} class="gap-2 w-full sm:w-auto">
					← Back to Home
				</Button>
				{#if blocks.length === 0}
					<Button size="lg" onclick={generateGenesis} class="gap-2 w-full sm:w-auto shadow-lg shadow-primary/20">
						Generate Genesis Block
					</Button>
				{/if}
			</div>
		</div>

		<!-- Instructions -->
		{#if blocks.length === 0}
			<div class="bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 rounded-2xl border-2 border-primary/10 p-6 sm:p-8">
				<h2 class="text-xl font-bold text-foreground mb-3">Interactive Blockchain Builder</h2>
				<p class="text-muted-foreground mb-4 leading-relaxed">
					Create your own custom supply chain blockchain step-by-step. Each block you add will be cryptographically linked to the previous block, creating an immutable chain of custody that proves origin and tracks every step of the supply chain journey.
				</p>
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div class="bg-card/50 rounded-lg border p-4">
						<div class="font-semibold text-foreground mb-1 text-sm">Step 1</div>
						<p class="text-xs text-muted-foreground">Generate the Genesis Block to initialize your blockchain</p>
					</div>
					<div class="bg-card/50 rounded-lg border p-4">
						<div class="font-semibold text-foreground mb-1 text-sm">Step 2</div>
						<p class="text-xs text-muted-foreground">Add supply chain steps with detailed information</p>
					</div>
					<div class="bg-card/50 rounded-lg border p-4">
						<div class="font-semibold text-foreground mb-1 text-sm">Step 3</div>
						<p class="text-xs text-muted-foreground">See cryptographic links forming an immutable chain</p>
					</div>
				</div>
			</div>
		{/if}
	</div>

	{#if blocks.length === 0}
		<div class="flex flex-col items-center justify-center p-6 sm:p-12 space-y-3 sm:space-y-4 bg-muted/30 rounded-2xl border-2 border-dashed">
			<div class="text-muted-foreground text-base sm:text-lg text-center font-medium">Ready to Build Your Supply Chain</div>
			<p class="text-sm text-muted-foreground text-center px-4 max-w-md">Generate the Genesis Block above to start creating your verifiable supply chain blockchain</p>
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
			<!-- Connector line from last block to Add Block button -->
			<div class="flex flex-col items-center my-2">
				<div class="w-1 h-12 bg-primary/40"></div>
			</div>
			<!-- Add Block button positioned at the end of the chain -->
			<div class="mb-6">
				<Dialog.Root bind:open={dialogOpen}>
					<Dialog.Trigger>
						<Button size="lg" class="gap-2">
							<span class="text-xl">+</span>
							Add Block
						</Button>
					</Dialog.Trigger>
					<Dialog.Content class="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
						<Dialog.Header>
							<Dialog.Title>Add Supply Chain Step</Dialog.Title>
							<Dialog.Description>
								Add a new step to the supply chain. The block will be linked to the previous block's hash.
							</Dialog.Description>
						</Dialog.Header>
						<AddBlockForm onSubmit={handleAddBlock} onCancel={handleCancel} />
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</div>
	{/if}
</div>
