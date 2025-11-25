<script lang="ts">
	import './layout.css';
	import favicon16 from '$lib/assets/icons8-blockchain-dotted-16.png';
	import favicon32 from '$lib/assets/icons8-blockchain-dotted-32.png';
	import favicon96 from '$lib/assets/icons8-blockchain-dotted-96.png';

	let { children } = $props();
</script>

<svelte:head>
	<title>Verifiable Supply Chain Transparency | Blockchain Origin Verification</title>
	<meta name="description" content="Third-party verified supply chain transparency on blockchain. Prove product origins, transport routes, and carbon footprint for sustainability reports. Trusted by enterprise retailers, restaurants, and government agencies." />
	<meta name="keywords" content="blockchain supply chain, verifiable origin, sustainability reports, carbon footprint tracking, supply chain transparency, B2B blockchain, third-party verification, ethical sourcing, ESG compliance" />
	<meta name="author" content="Verifiable Supply Chain Solutions" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Verifiable Supply Chain Transparency on Blockchain" />
	<meta property="og:description" content="Stop self-reported sustainability claims. Prove product origins with immutable, third-party verified blockchain records for enterprise supply chains." />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Verifiable Supply Chain Transparency | Blockchain Verification" />
	<meta name="twitter:description" content="Third-party verified supply chain transparency. Prove origins, track routes, and document carbon footprint with immutable blockchain records." />

	<link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
	<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
	<link rel="icon" type="image/png" sizes="96x96" href={favicon96} />
</svelte:head>

{@render children()}
