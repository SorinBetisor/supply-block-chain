<script lang="ts">
	import { Block } from '$lib/components';
	import { Blockchain } from '$lib/blockchain';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Badge } from '$lib/components/ui/badge';
	import AddBlockForm from '$lib/components/AddBlockForm.svelte';
	import type { Block as BlockType, SupplyChainStepData } from '$lib/blockchain/types/types.ts';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/auth/authStore.svelte';
	import { getRoleDisplayName } from '$lib/auth/employees';
	import ZaraLogo from '$lib/assets/Zara_(retailer)-Logo.wine.svg';

	// Create a sample blockchain for demo
	const blockchain = new Blockchain();

	let blocks: BlockType[] = $state([]);
	let dialogOpen = $state(false);

	// Load blockchain from localStorage on mount
	onMount(() => {
		loadBlockchainFromStorage();
	});

	// Load blockchain data from localStorage
	function loadBlockchainFromStorage() {
		if (typeof window === 'undefined') return;
		
		try {
			const saved = localStorage.getItem('supply_chain_blocks');
			if (saved) {
				const savedBlocks = JSON.parse(saved);
				blocks = savedBlocks;
				// Import into blockchain instance
				blockchain.importChain(savedBlocks);
			}
		} catch (error) {
			console.error('Failed to load blockchain from storage:', error);
		}
	}

	// Save blockchain to localStorage
	function saveBlockchainToStorage() {
		if (typeof window === 'undefined') return;
		
		try {
			localStorage.setItem('supply_chain_blocks', JSON.stringify(blocks));
		} catch (error) {
			console.error('Failed to save blockchain to storage:', error);
		}
	}

	// Generate genesis block
	async function generateGenesis() {
		try {
			const block = await blockchain.createGenesisBlock();
			blocks = [block.toJSON()];
			saveBlockchainToStorage();
		} catch (error) {
			console.error('Failed to create genesis block:', error);
			alert('Failed to create genesis block: ' + (error instanceof Error ? error.message : String(error)));
		}
	}

	// Check if user needs to login before opening dialog
	function handleAddBlockClick() {
		if (!authStore.isAuthenticated) {
			// Redirect to login, then come back
			goto('/login?redirect=/');
			return;
		}
		dialogOpen = true;
	}

	// Handle adding a new block
	async function handleAddBlock(data: SupplyChainStepData) {
		try {
			// Add employee metadata to the block data
			const currentUser = authStore.currentUser;
			if (currentUser) {
				data.addedBy = {
					employeeId: currentUser.id,
					employeeName: currentUser.name,
					employeeRole: currentUser.role,
					timestamp: Date.now()
				};
			}

			const newBlock = await blockchain.addBlock(data);
			blocks = [...blocks, newBlock.toJSON()];
			saveBlockchainToStorage();
			dialogOpen = false;
		} catch (error) {
			console.error('Failed to add block:', error);
			alert('Failed to add block: ' + (error instanceof Error ? error.message : String(error)));
		}
	}

	function handleCancel() {
		dialogOpen = false;
	}

	function handleLogout() {
		authStore.logout();
		// Stay on current page, just update UI
	}
</script>

<svelte:head>
	<title>Supply Chain Demo</title>
	<meta name="description" content="Create your own blockchain supply chain. Add blocks and track products through each step with cryptographic verification." />
</svelte:head>

<div class="container mx-auto p-6">
	<!-- Employee Info Header -->
	{#if authStore.currentUser}
		<div class="bg-muted/50 border rounded-lg p-4 mb-6 flex items-center justify-between">
			<div class="flex items-center gap-4">
				<div>
					<div class="text-sm text-muted-foreground">Logged in as</div>
					<div class="font-semibold text-lg">{authStore.currentUser.name}</div>
				</div>
				<Badge variant="secondary">
					{getRoleDisplayName(authStore.currentUser.role)}
				</Badge>
				<div class="text-sm text-muted-foreground">
					{authStore.currentUser.location}
				</div>
			</div>
			<Button variant="outline" size="sm" onclick={handleLogout}>
				Logout
			</Button>
		</div>
	{/if}

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
				{#if authStore.isAuthenticated}
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
				{:else}
					<Button size="lg" class="gap-2" onclick={handleAddBlockClick}>
						<span class="text-xl">+</span>
						Add Block (Login Required)
					</Button>
				{/if}
			</div>
		</div>
	{/if}
</div>
