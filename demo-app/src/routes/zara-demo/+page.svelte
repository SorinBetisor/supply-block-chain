<script lang="ts">
	import { Block } from '$lib/components';
	import { Blockchain } from '$lib/blockchain';
	import { ZARA_SWEATSHIRT_STEPS } from '$lib/blockchain/demo_zara.ts';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/auth/authStore.svelte';
	import { getRoleDisplayName } from '$lib/auth/employees';
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

	function handleLogout() {
		authStore.logout();
		// Stay on current page
	}

	// Load demo data immediately
	loadZaraDemo();
</script>

<svelte:head>
	<title>Zara Supply Chain Demo - Blockchain Product Tracking</title>
	<meta name="description" content="Complete Zara sweatshirt supply chain journey from cotton farm to retail store. Demonstrates blockchain tracking with real-world supply chain steps." />
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

	<div class="mb-6">
		<div class="flex items-center justify-between mb-2">
			<img src={ZaraLogo} alt="Zara Logo" class="h-16 w-auto" />
			<Button variant="outline" onclick={() => goto('/')} class="gap-2">
				← Back
			</Button>
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

