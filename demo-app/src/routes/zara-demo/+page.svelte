<script lang="ts">
	import { Block } from '$lib/components';
	import { Blockchain } from '$lib/blockchain';
	import { ZARA_SWEATSHIRT_STEPS } from '$lib/blockchain/demo_zara.ts';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import type { Block as BlockType } from '$lib/blockchain/types/types.ts';
	import ZaraLogo from '$lib/assets/Zara_(retailer)-Logo.wine.svg';
	import { ArrowLeft, ShieldCheck, Truck, FileText, Leaf, Box, CheckCircle2, Link as LinkIcon } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

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

<div class="min-h-screen bg-gradient-to-b from-background to-muted/20">
	<div class="container mx-auto p-6 max-w-5xl">
		<!-- Header -->
		<div class="mb-12" in:fade={{ duration: 800, delay: 200 }}>
			<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
				<div class="flex items-center gap-4 bg-white/50 dark:bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-border/50 shadow-sm">
					<img src={ZaraLogo} alt="Zara Logo" class="h-12 w-auto" />
					<div class="h-8 w-px bg-border"></div>
					<span class="font-semibold text-lg tracking-tight">Supply Chain Transparency</span>
				</div>
				<Button variant="outline" onclick={() => goto('/')} class="gap-2 self-start sm:self-auto">
					<ArrowLeft class="h-4 w-4" />
					Back to Home
				</Button>
			</div>

			<!-- Demo Introduction -->
			<div class="relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 rounded-3xl border border-primary/10 p-8 sm:p-10 mb-10 shadow-lg">
				<div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
				<div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
				
				<div class="relative z-10">
					<div class="flex flex-col md:flex-row gap-8 items-start md:items-center">
						<div class="flex-1">
							<h1 class="text-3xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
								Verifiable Fashion <br/>
								<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Supply Chain</span>
							</h1>
							<p class="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
								Experience the journey of a Zara sweatshirt from raw material to retail store. 
								This live blockchain demonstration proves <span class="font-semibold text-foreground">authenticity</span>, 
								<span class="font-semibold text-foreground">sustainability</span>, and 
								<span class="font-semibold text-foreground">ethical sourcing</span> at every step.
							</p>
							
							<div class="flex flex-wrap gap-3 text-sm">
								<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border shadow-sm backdrop-blur-sm">
									<CheckCircle2 class="h-4 w-4 text-green-600" />
									<span class="font-medium">7 Verified Steps</span>
								</div>
								<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border shadow-sm backdrop-blur-sm">
									<ShieldCheck class="h-4 w-4 text-blue-600" />
									<span class="font-medium">Immutable Records</span>
								</div>
								<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border shadow-sm backdrop-blur-sm">
									<Leaf class="h-4 w-4 text-green-600" />
									<span class="font-medium">Carbon Tracked</span>
								</div>
							</div>
						</div>
						
						<!-- Visual decoration or stats -->
						<div class="hidden md:block p-6 bg-background/60 backdrop-blur-md rounded-2xl border shadow-sm max-w-xs w-full">
							<div class="space-y-4">
								<div class="flex items-center gap-3">
									<div class="p-2 bg-primary/10 rounded-lg text-primary">
										<Box class="h-5 w-5" />
									</div>
									<div>
										<div class="text-xs text-muted-foreground font-medium uppercase tracking-wider">Product</div>
										<div class="font-semibold">Premium Cotton Sweatshirt</div>
									</div>
								</div>
								<div class="h-px bg-border"></div>
								<div class="flex items-center gap-3">
									<div class="p-2 bg-blue-500/10 rounded-lg text-blue-600">
										<LinkIcon class="h-5 w-5" />
									</div>
									<div>
										<div class="text-xs text-muted-foreground font-medium uppercase tracking-wider">Blockchain</div>
										<div class="font-semibold">Private Consortium</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- What You'll See -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
				<div class="group hover:bg-muted/50 transition-colors bg-card rounded-2xl border p-6 shadow-sm">
					<div class="mb-4 p-3 bg-green-500/10 w-fit rounded-xl text-green-600 group-hover:scale-110 transition-transform">
						<Leaf class="h-6 w-6" />
					</div>
					<h3 class="font-semibold text-foreground mb-2">Origin Verification</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						Cryptographic proof of raw material origin, ensuring sustainable farming practices.
					</p>
				</div>
				<div class="group hover:bg-muted/50 transition-colors bg-card rounded-2xl border p-6 shadow-sm">
					<div class="mb-4 p-3 bg-blue-500/10 w-fit rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
						<Truck class="h-6 w-6" />
					</div>
					<h3 class="font-semibold text-foreground mb-2">Transport Routes</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						Track logistics with verified handlers, locations, and transportation methods.
					</p>
				</div>
				<div class="group hover:bg-muted/50 transition-colors bg-card rounded-2xl border p-6 shadow-sm">
					<div class="mb-4 p-3 bg-purple-500/10 w-fit rounded-xl text-purple-600 group-hover:scale-110 transition-transform">
						<FileText class="h-6 w-6" />
					</div>
					<h3 class="font-semibold text-foreground mb-2">Processing Documentation</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						View manufacturing details, quality checks, and certifications at every stage.
					</p>
				</div>
			</div>
		</div>

		{#if isLoading}
			<div class="flex flex-col items-center justify-center p-24 space-y-4" in:fade>
				<div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
				<div class="text-muted-foreground font-medium">Loading blockchain data...</div>
			</div>
		{:else if blocks.length === 0}
			<div class="flex flex-col items-center justify-center p-12 space-y-4 bg-destructive/5 rounded-2xl border border-destructive/20">
				<div class="text-destructive font-medium text-lg">Failed to load demo data</div>
				<Button variant="outline" onclick={() => window.location.reload()}>Retry</Button>
			</div>
		{:else}
			<div class="relative flex flex-col items-center space-y-0 w-full pb-24">
				<!-- Timeline line background -->
				<div class="absolute left-1/2 top-8 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2 hidden md:block"></div>

				{#each blocks as block, index (block.hash)}
					<div 
						class="flex flex-col items-center w-full relative z-10"
						in:fly={{ y: 50, duration: 800, delay: index * 150 }}
					>
						<!-- Step Number Badge (for desktop timeline) -->
						{#if index > 0}
							<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 bg-background border-2 border-primary rounded-full items-center justify-center text-xs font-bold text-primary z-20 shadow-sm">
								{index}
							</div>
						{/if}

						<div class="w-full transition-all duration-300 hover:scale-[1.01]">
							<Block block={block} expanded={index === blocks.length - 1} />
						</div>
						
						{#if index < blocks.length - 1}
							<!-- Connector line for mobile -->
							<div class="flex flex-col items-center my-4 md:hidden">
								<div class="w-px h-8 bg-border"></div>
							</div>
							<!-- Spacer for desktop -->
							<div class="hidden md:block h-12"></div>
						{/if}
					</div>
				{/each}
				
				<!-- End of chain indicator -->
				<div class="mt-8 flex flex-col items-center gap-3 text-muted-foreground" in:fade={{ delay: 1500 }}>
					<div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center border">
						<CheckCircle2 class="h-6 w-6 text-green-600" />
					</div>
					<span class="text-sm font-medium">Supply Chain Complete</span>
				</div>
			</div>
		{/if}
	</div>
</div>

