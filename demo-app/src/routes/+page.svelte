<script lang="ts">
	import { Block } from '$lib/components';
	import { Blockchain } from '$lib/blockchain';

	// Create a sample blockchain for demo
	const blockchain = new Blockchain();

	let sampleBlock: any = null;

	// Create genesis block on mount
	async function initializeDemo() {
		try {
			const block = await blockchain.createGenesisBlock();
			sampleBlock = block.toJSON();
		} catch (error) {
			console.error('Failed to create demo block:', error);
		}
	}

	// Initialize on component mount
	initializeDemo();
</script>

<div class="container mx-auto p-6">
	<h1 class="text-3xl font-bold mb-6">Blockchain Supply Chain Demo</h1>


	{#if sampleBlock}
		<Block block={sampleBlock} />
	{:else}
		<div class="flex items-center justify-center p-8">
			<div class="text-muted-foreground">Loading blockchain demo...</div>
		</div>
	{/if}
</div>
