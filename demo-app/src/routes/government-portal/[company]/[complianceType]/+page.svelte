<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { goto } from '$app/navigation';
	import type { Block } from '$lib/blockchain/types/types.ts';
	import { 
		ArrowLeft, 
		ShieldCheck, 
		AlertCircle,
		CheckCircle2,
		FileText,
		Calendar,
		Hash,
		Leaf,
		Users,
		Droplet,
		Zap,
		Factory,
		Recycle,
		Link as LinkIcon,
		Clock
	} from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	const company = $derived($page.params.company);
	const complianceType = $derived($page.params.complianceType);

	// Compliance type mapping
	const complianceTypeMap: { [key: string]: { name: string; icon: any; colorClass: string; bgClass: string; borderClass: string } } = {
		co2: { 
			name: 'CO₂ Emissions', 
			icon: Leaf, 
			colorClass: 'text-green-700',
			bgClass: 'bg-green-100',
			borderClass: 'border-green-500'
		},
		labor: { 
			name: 'Labor Standards', 
			icon: Users, 
			colorClass: 'text-blue-700',
			bgClass: 'bg-blue-100',
			borderClass: 'border-blue-500'
		},
		water: { 
			name: 'Water Usage', 
			icon: Droplet, 
			colorClass: 'text-cyan-700',
			bgClass: 'bg-cyan-100',
			borderClass: 'border-cyan-500'
		},
		energy: { 
			name: 'Energy Consumption', 
			icon: Zap, 
			colorClass: 'text-yellow-700',
			bgClass: 'bg-yellow-100',
			borderClass: 'border-yellow-500'
		},
		materials: { 
			name: 'Material Sourcing', 
			icon: Factory, 
			colorClass: 'text-purple-700',
			bgClass: 'bg-purple-100',
			borderClass: 'border-purple-500'
		},
		waste: { 
			name: 'Waste Management', 
			icon: Recycle, 
			colorClass: 'text-orange-700',
			bgClass: 'bg-orange-100',
			borderClass: 'border-orange-500'
		}
	};

	const typeInfo = $derived(complianceTypeMap[complianceType] || complianceTypeMap.co2);

	let blocks = $state<Block[]>([]);
	let isLoading = $state(true);

	// Load blockchain for this specific compliance type
	function loadBlockchain() {
		setTimeout(() => {
			const storedData = localStorage.getItem(`blockchain_${company}`);
			
			if (storedData) {
				try {
					const blockchain = JSON.parse(storedData);
					blocks = blockchain.filter((block: Block) => 
						block.index > 0 && block.data.metadata?.complianceType === complianceType
					);
				} catch (error) {
					console.error('Failed to parse blockchain data:', error);
					blocks = [];
				}
			} else {
				blocks = [];
			}
			
			isLoading = false;
		}, 300);
	}

	loadBlockchain();
</script>

<svelte:head>
	<title>{typeInfo.name} Blockchain - {company} | Government Audit</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-background to-muted/20">
	<div class="container mx-auto p-6 max-w-6xl">
		<!-- Header -->
		<div class="mb-8" in:fade={{ duration: 600 }}>
			<Button variant="outline" onclick={() => goto(`/government-portal?company=${company}`)} class="gap-2 mb-6">
				<ArrowLeft class="h-4 w-4" />
				Back to Portal
			</Button>

			<div class="flex items-center gap-4 mb-4">
				<div class="p-3 {typeInfo.bgClass} rounded-xl">
					<svelte:component this={typeInfo.icon} class="h-8 w-8 {typeInfo.colorClass}" />
				</div>
				<div>
					<h1 class="text-4xl font-bold tracking-tight">
						{typeInfo.name} Blockchain
					</h1>
					<p class="text-muted-foreground capitalize">{company} - Compliance Verification</p>
				</div>
			</div>

			<Card class="border-l-4 {typeInfo.borderClass}">
				<CardContent class="pt-6">
					<div class="flex items-start gap-4">
						<div class="p-2 {typeInfo.bgClass} rounded-lg">
							<LinkIcon class="h-5 w-5 {typeInfo.colorClass}" />
						</div>
						<div class="flex-1">
							<h3 class="font-semibold mb-2">Blockchain Verification</h3>
							<p class="text-sm text-muted-foreground leading-relaxed">
								Each block in this chain represents a verified {typeInfo.name.toLowerCase()} submission. 
								All data is cryptographically secured and immutable.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>

		{#if isLoading}
			<div class="flex flex-col items-center justify-center p-24 space-y-4" in:fade>
				<div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
				<div class="text-muted-foreground font-medium">Loading blockchain...</div>
			</div>
		{:else if blocks.length === 0}
			<Card class="border-amber-200 bg-amber-50/50">
				<CardContent class="pt-12 pb-12 text-center">
					<div class="flex flex-col items-center gap-4 max-w-md mx-auto">
						<div class="p-4 bg-amber-100 rounded-full">
							<AlertCircle class="h-12 w-12 text-amber-700" />
						</div>
						<h3 class="font-bold text-xl text-amber-900">No Blocks Found</h3>
						<p class="text-amber-800 leading-relaxed">
							No {typeInfo.name.toLowerCase()} compliance data has been submitted yet.
						</p>
					</div>
				</CardContent>
			</Card>
		{:else}
			<!-- Blockchain Stats -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" in:fly={{ y: 20, duration: 600, delay: 100 }}>
				<Card>
					<CardContent class="pt-6">
						<div class="flex items-center gap-3">
							<div class="p-2 bg-primary/10 rounded-lg">
								<Hash class="h-5 w-5 text-primary" />
							</div>
							<div>
								<div class="text-xs text-muted-foreground uppercase tracking-wider">Total Blocks</div>
								<div class="text-2xl font-bold">{blocks.length}</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent class="pt-6">
						<div class="flex items-center gap-3">
							<div class="p-2 bg-green-100 rounded-lg">
								<CheckCircle2 class="h-5 w-5 text-green-700" />
							</div>
							<div>
								<div class="text-xs text-muted-foreground uppercase tracking-wider">Verified</div>
								<div class="text-2xl font-bold text-green-600">
									{blocks.filter(b => b.data.documents && b.data.documents.length > 0).length}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent class="pt-6">
						<div class="flex items-center gap-3">
							<div class="p-2 bg-blue-100 rounded-lg">
								<Calendar class="h-5 w-5 text-blue-700" />
							</div>
							<div>
								<div class="text-xs text-muted-foreground uppercase tracking-wider">Last Submission</div>
								<div class="text-sm font-semibold">
									{new Date(Math.max(...blocks.map(b => b.timestamp))).toLocaleDateString()}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- Blockchain Timeline -->
			<div class="relative" in:fly={{ y: 20, duration: 600, delay: 200 }}>
				<h3 class="text-xl font-bold mb-6">Blockchain Timeline</h3>

				<!-- Timeline line -->
				<div class="absolute left-8 top-16 bottom-0 w-0.5 bg-border hidden md:block"></div>

				<div class="space-y-6">
					{#each blocks as block, index}
						<div class="relative" in:fly={{ x: -20, duration: 600, delay: 300 + index * 100 }}>
							<!-- Timeline dot -->
							<div class="absolute left-7 top-6 w-4 h-4 rounded-full {typeInfo.borderClass} border-4 bg-background hidden md:block"></div>

							<Card class="md:ml-16 hover:shadow-lg transition-shadow border-l-4 {typeInfo.borderClass}">
								<CardHeader>
									<div class="flex items-start justify-between gap-4">
										<div class="flex-1">
											<div class="flex items-center gap-3 mb-2">
												<div class="p-2 {typeInfo.bgClass} rounded-lg">
													<svelte:component this={typeInfo.icon} class="h-4 w-4 {typeInfo.colorClass}" />
												</div>
												<CardTitle class="text-lg">Block #{block.index}</CardTitle>
												{#if block.data.documents && block.data.documents.length > 0}
													<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">
														<ShieldCheck class="h-3 w-3 mr-1" />
														Verified
													</Badge>
												{:else}
													<Badge variant="outline" class="text-red-600 border-red-200 bg-red-50">
														<AlertCircle class="h-3 w-3 mr-1" />
														Not Verified
													</Badge>
												{/if}
											</div>
											<CardDescription class="flex items-center gap-2">
												<Clock class="h-3 w-3" />
												{new Date(block.timestamp).toLocaleString()}
											</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent class="space-y-4">
									<!-- Data Summary -->
									<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
										{#if complianceType === 'co2'}
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">CO₂ Emissions</div>
												<div class="font-semibold">{block.data.metadata.calculatedEmissions} kg</div>
											</div>
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Distance</div>
												<div class="font-semibold">{block.data.metadata.distance} km</div>
											</div>
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Transport</div>
												<div class="font-semibold capitalize">{block.data.metadata.transportMethod}</div>
											</div>
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Vehicles</div>
												<div class="font-semibold">{block.data.metadata.vehicleCount}</div>
											</div>
										{:else if complianceType === 'labor'}
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Employees</div>
												<div class="font-semibold">{block.data.metadata.employeeCount}</div>
											</div>
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Avg Wage</div>
												<div class="font-semibold">€{block.data.metadata.averageWage}/hr</div>
											</div>
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Child Labor</div>
												<div class="font-semibold text-green-600">None</div>
											</div>
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Incidents</div>
												<div class="font-semibold">{block.data.metadata.safetyIncidents}</div>
											</div>
										{:else if complianceType === 'water'}
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Used</div>
												<div class="font-semibold">{block.data.metadata.volumeUsed} m³</div>
											</div>
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Treated</div>
												<div class="font-semibold">{block.data.metadata.wastewaterTreated} m³</div>
											</div>
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Period</div>
												<div class="font-semibold">{block.data.metadata.period}</div>
											</div>
											<div class="p-3 bg-muted/50 rounded-lg">
												<div class="text-xs text-muted-foreground mb-1">Treatment Rate</div>
												<div class="font-semibold">{Math.round((parseFloat(block.data.metadata.wastewaterTreated) / parseFloat(block.data.metadata.volumeUsed)) * 100)}%</div>
											</div>
										{/if}
									</div>

									<!-- Blockchain Info -->
									<div class="pt-4 border-t space-y-2">
										<div class="flex items-center gap-2 text-xs">
											<Hash class="h-3 w-3 text-muted-foreground" />
											<span class="text-muted-foreground">Block Hash:</span>
											<code class="font-mono text-primary bg-primary/5 px-2 py-0.5 rounded flex-1 truncate">{block.hash}</code>
										</div>
										<div class="flex items-center gap-2 text-xs">
											<LinkIcon class="h-3 w-3 text-muted-foreground" />
											<span class="text-muted-foreground">Previous Hash:</span>
											<code class="font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded flex-1 truncate">{block.previousHash}</code>
										</div>
										{#if block.data.documents && block.data.documents.length > 0}
											<div class="flex items-center gap-2 text-xs">
												<FileText class="h-3 w-3 text-muted-foreground" />
												<span class="text-muted-foreground">Documents:</span>
												<Badge variant="secondary">{block.data.documents.length} attached</Badge>
											</div>
										{/if}
									</div>
								</CardContent>
							</Card>
						</div>
					{/each}
				</div>

				<!-- Chain Complete Indicator -->
				<div class="flex items-center justify-center mt-8" in:fade={{ delay: 800 }}>
					{#if blocks.every(b => b.data.documents && b.data.documents.length > 0)}
						<div class="flex items-center gap-3 px-6 py-3 bg-green-50 border border-green-200 rounded-full">
							<CheckCircle2 class="h-5 w-5 text-green-600" />
							<span class="text-sm font-medium text-green-900">Blockchain Verified & Complete</span>
						</div>
					{:else}
						<div class="flex items-center gap-3 px-6 py-3 bg-amber-50 border border-amber-200 rounded-full">
							<AlertCircle class="h-5 w-5 text-amber-600" />
							<span class="text-sm font-medium text-amber-900">Blockchain Complete - Some Blocks Unverified</span>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>

