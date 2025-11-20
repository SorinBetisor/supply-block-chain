<script lang="ts">
	import './layout.css';
	import favicon16 from '$lib/assets/icons8-blockchain-dotted-16.png';
	import favicon32 from '$lib/assets/icons8-blockchain-dotted-32.png';
	import favicon96 from '$lib/assets/icons8-blockchain-dotted-96.png';

	let { children } = $props();
</script>

<svelte:head>
	<title>Blockchain Supply Chain Demo - Track Products with Blockchain Technology</title>
	<meta name="description" content="Interactive blockchain supply chain demonstration. Track products from origin to destination with cryptographic verification and tamper-proof records." />
	<meta name="keywords" content="blockchain, supply chain, product tracking, blockchain demo, supply chain management" />
	<meta name="author" content="Supply Chain Blockchain Demo" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Blockchain Supply Chain Demo" />
	<meta property="og:description" content="Interactive blockchain supply chain demonstration. Track products with cryptographic verification." />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Blockchain Supply Chain Demo" />
	<meta name="twitter:description" content="Interactive blockchain supply chain demonstration. Track products with cryptographic verification." />
	
	<link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
	<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
	<link rel="icon" type="image/png" sizes="96x96" href={favicon96} />
</svelte:head>

{@render children()}
