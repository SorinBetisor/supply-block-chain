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
	<title>Supply Chain Demo</title>
	<meta name="description" content="Create your own blockchain supply chain. Add blocks and track products through each step with cryptographic verification." />
</svelte:head>

<div class="container mx-auto p-4 sm:p-6">
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
		<h1 class="text-xl sm:text-2xl md:text-3xl font-bold">Blockchain Supply Chain Demo</h1>
		<div class="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
			<Button variant="outline" onclick={() => goto('/')} class="gap-2 w-full sm:w-auto">
				← Back
			</Button>
			{#if blocks.length === 0}
				<Button size="lg" onclick={generateGenesis} class="gap-2 w-full sm:w-auto">
					Generate Genesis Block
				</Button>
			{/if}
		</div>
	</div>

	{#if blocks.length === 0}
		<div class="flex flex-col items-center justify-center p-6 sm:p-12 space-y-3 sm:space-y-4">
			<div class="text-muted-foreground text-base sm:text-lg text-center">No blocks in the chain yet</div>
			<p class="text-sm text-muted-foreground text-center px-4">Click "Generate Genesis Block" to start the blockchain</p>
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
