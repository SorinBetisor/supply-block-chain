<script lang="ts">
	import { Block } from '$lib/components';
	import { Blockchain } from '$lib/blockchain';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import AddBlockForm from '$lib/components/AddBlockForm.svelte';
	import type { Block as BlockType, SupplyChainStepData } from '$lib/blockchain/types/types.ts';
	import { goto } from '$app/navigation';
	import ZaraLogo from '$lib/assets/Zara_(retailer)-Logo.wine.svg';

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

<div class="container mx-auto p-6">
	<div class="flex items-center justify-between mb-6">
		<h1 class="text-3xl font-bold">Blockchain Supply Chain Demo</h1>
		<div class="flex gap-3 items-center">
			<button
				onclick={() => goto('/zara-demo')}
				class="cursor-pointer hover:opacity-80 transition-opacity"
				aria-label="Go to Zara Demo"
			>
				<img src={ZaraLogo} alt="Zara Logo" class="h-12 w-auto" />
			</button>
			{#if blocks.length === 0}
				<Button size="lg" onclick={generateGenesis} class="gap-2">
					Generate Genesis Block
				</Button>
			{/if}
		</div>
	</div>

	{#if blocks.length === 0}
		<div class="flex flex-col items-center justify-center p-12 space-y-4">
			<div class="text-muted-foreground text-lg">No blocks in the chain yet</div>
			<p class="text-sm text-muted-foreground">Click "Generate Genesis Block" to start the blockchain</p>
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
					<Dialog.Content class="max-w-2xl max-h-[90vh] overflow-y-auto">
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
