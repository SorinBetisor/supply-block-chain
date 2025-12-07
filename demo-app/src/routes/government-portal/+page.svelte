<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import * as Select from '$lib/components/ui/select';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Block } from '$lib/blockchain/types/types.ts';
	import { initializeDummyDataForZara } from '$lib/utils/dummyComplianceData';
	import { 
		ArrowLeft, 
		Building2, 
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
		Scale,
		Eye,
		Download,
		TrendingUp,
		Globe,
		ArrowRight,
		ChevronDown
	} from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	// Initialize dummy data on mount
	onMount(async () => {
		await initializeDummyDataForZara();
		
		// Check if there's a company parameter in the URL
		const urlCompany = $page.url.searchParams.get('company');
		if (urlCompany && companies.find(c => c.id === urlCompany)) {
			selectedCompany = urlCompany;
			loadCompanyData();
		}
	});

	// Available companies (in real app, this would come from a database)
	const companies = [
		{ id: 'zara', name: 'Zara Inc.', industry: 'Fashion Retail' },
		{ id: 'hm', name: 'H&M', industry: 'Fashion Retail' },
		{ id: 'nike', name: 'Nike', industry: 'Sportswear' }
	];

	let selectedCompany = $state<string>('');
	let complianceBlocks = $state<Block[]>([]);
	let isLoading = $state(false);

	// Compliance type mapping
	const complianceTypeMap: { [key: string]: { name: string; icon: any; colorClass: string; bgClass: string; borderClass: string } } = {
		co2: { 
			name: 'CO₂ Emissions', 
			icon: Leaf, 
			colorClass: 'text-green-700',
			bgClass: 'bg-green-100',
			borderClass: 'border-l-green-500'
		},
		labor: { 
			name: 'Labor Standards', 
			icon: Users, 
			colorClass: 'text-blue-700',
			bgClass: 'bg-blue-100',
			borderClass: 'border-l-blue-500'
		},
		water: { 
			name: 'Water Usage', 
			icon: Droplet, 
			colorClass: 'text-cyan-700',
			bgClass: 'bg-cyan-100',
			borderClass: 'border-l-cyan-500'
		},
		energy: { 
			name: 'Energy Consumption', 
			icon: Zap, 
			colorClass: 'text-yellow-700',
			bgClass: 'bg-yellow-100',
			borderClass: 'border-l-yellow-500'
		},
		materials: { 
			name: 'Material Sourcing', 
			icon: Factory, 
			colorClass: 'text-purple-700',
			bgClass: 'bg-purple-100',
			borderClass: 'border-l-purple-500'
		},
		waste: { 
			name: 'Waste Management', 
			icon: Recycle, 
			colorClass: 'text-orange-700',
			bgClass: 'bg-orange-100',
			borderClass: 'border-l-orange-500'
		}
	};

	// Load compliance data for selected company (ONLY from localStorage - no dummy data)
	function loadCompanyData() {
		if (!selectedCompany) return;
		
		isLoading = true;
		
		// Simulate loading delay
		setTimeout(() => {
			const storedData = localStorage.getItem(`blockchain_${selectedCompany}`);
			
			if (storedData) {
				try {
					const blockchain = JSON.parse(storedData);
					complianceBlocks = blockchain.filter((block: Block) => 
						block.index > 0 && block.data.metadata?.complianceType
					);
				} catch (error) {
					console.error('Failed to parse blockchain data:', error);
					complianceBlocks = [];
				}
			} else {
				// No data found - empty state
				complianceBlocks = [];
			}
			
			isLoading = false;
		}, 500);
	}

	// Calculate overall compliance score
	const complianceScore = $derived.by(() => {
		if (complianceBlocks.length === 0) return 0;
		
		// Base score on number of compliance types submitted
		const uniqueTypes = new Set(complianceBlocks.map(b => b.data.metadata?.complianceType));
		const typeScore = (uniqueTypes.size / 6) * 50; // Max 50 points for coverage
		
		// Points for recent submissions (last 30 days)
		const recentSubmissions = complianceBlocks.filter(b => 
			Date.now() - b.timestamp < 30 * 24 * 60 * 60 * 1000
		).length;
		const recencyScore = Math.min(recentSubmissions * 10, 30); // Max 30 points
		
		// Points for documentation
		const withDocs = complianceBlocks.filter(b => 
			b.data.documents && b.data.documents.length > 0
		).length;
		const docScore = (withDocs / complianceBlocks.length) * 20; // Max 20 points
		
		return Math.round(typeScore + recencyScore + docScore);
	});

	// Compliance status with explicit color classes
	const complianceStatus = $derived({
		level: complianceScore >= 80 ? 'excellent' :
		       complianceScore >= 60 ? 'good' :
		       complianceScore >= 40 ? 'needs-improvement' : 'critical',
		borderClass: complianceScore >= 80 ? 'border-green-500' :
		             complianceScore >= 60 ? 'border-blue-500' :
		             complianceScore >= 40 ? 'border-yellow-500' : 'border-red-500',
		textClass: complianceScore >= 80 ? 'text-green-600' :
		           complianceScore >= 60 ? 'text-blue-600' :
		           complianceScore >= 40 ? 'text-yellow-600' : 'text-red-600',
		bgClass: complianceScore >= 80 ? 'bg-green-50' :
		         complianceScore >= 60 ? 'bg-blue-50' :
		         complianceScore >= 40 ? 'bg-yellow-50' : 'bg-red-50',
		badgeBorderClass: complianceScore >= 80 ? 'border-green-200' :
		                  complianceScore >= 60 ? 'border-blue-200' :
		                  complianceScore >= 40 ? 'border-yellow-200' : 'border-red-200',
		label: complianceScore >= 80 ? 'Excellent Compliance' :
		       complianceScore >= 60 ? 'Good Compliance' :
		       complianceScore >= 40 ? 'Needs Improvement' : 'Critical Issues'
	});
</script>

<svelte:head>
	<title>Government Audit Portal | Regulatory Compliance Verification</title>
	<meta name="description" content="Government portal for auditing and verifying corporate compliance data on the blockchain" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-background to-muted/20">
	<div class="container mx-auto p-6 max-w-7xl">
		<!-- Header -->
		<div class="mb-12" in:fade={{ duration: 600 }}>
			<div class="flex items-center justify-between mb-8">
				<div>
					<Button variant="outline" onclick={() => goto('/')} class="gap-2 mb-4">
						<ArrowLeft class="h-4 w-4" />
						Back to Home
					</Button>
					<h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
						Government Audit Portal
					</h1>
					<p class="text-lg text-muted-foreground max-w-3xl">
						Verify corporate compliance data secured on the blockchain. View real-time ESG metrics and regulatory adherence.
					</p>
				</div>
				<div class="hidden md:block">
					<div class="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background rounded-2xl border border-blue-100 dark:border-blue-800 shadow-sm">
						<div class="flex flex-col items-center">
							<div class="relative mb-3 group">
								<!-- Outer Gold Ring with Glow -->
								<div class="h-24 w-24 rounded-full border-[3px] border-yellow-500/30 flex items-center justify-center bg-blue-50/50 dark:bg-blue-900/10 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-500">
									<!-- Inner Blue Circle -->
									<div class="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-inner relative overflow-hidden ring-2 ring-yellow-400/50">
										<!-- Shine effect -->
										<div class="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
										<!-- Icon -->
										<Scale class="h-10 w-10 text-yellow-400 drop-shadow-md" strokeWidth={1.5} />
										
										<!-- Simulated Stars Ring (simplified dots) -->
										<div class="absolute inset-2 border border-blue-400/30 rounded-full opacity-50"></div>
									</div>
								</div>
								<!-- Official Badge Check -->
								<div class="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border-[3px] border-white dark:border-background shadow-sm">
									<CheckCircle2 class="h-3.5 w-3.5 text-white" />
								</div>
							</div>
							<div class="text-center">
								<p class="text-sm font-bold text-blue-900 dark:text-blue-100 tracking-tight">EU Regulatory Body</p>
								<div class="flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-medium mt-0.5">
									<ShieldCheck class="h-3 w-3 text-blue-500" />
									<span>Authorized Auditor</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Info Banner -->
			<Card class="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 mb-8">
				<CardContent class="pt-6">
					<div class="flex items-start gap-4">
						<div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
							<ShieldCheck class="h-5 w-5 text-blue-700 dark:text-blue-300" />
						</div>
						<div class="flex-1">
							<h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Blockchain-Verified Compliance Data</h3>
							<p class="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
								All compliance submissions are cryptographically secured on the blockchain. Each entry is immutable, 
								timestamped, and verifiable. Companies cannot retroactively modify their compliance records.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<!-- Company Selector -->
			<Card class="border-2 border-primary/20">
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Building2 class="h-5 w-5 text-primary" />
						Select Company to Audit
					</CardTitle>
					<CardDescription>Choose a company to view their blockchain-verified compliance submissions</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="w-full md:w-96">
						<select 
							bind:value={selectedCompany}
							on:change={loadCompanyData}
							class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm transition-colors hover:bg-accent/50"
						>
							<option value="">Select a company...</option>
							{#each companies as company}
								<option value={company.id}>
									{company.name} - {company.industry}
								</option>
							{/each}
						</select>
					</div>
				</CardContent>
			</Card>
		</div>

		{#if isLoading}
			<div class="flex flex-col items-center justify-center p-24 space-y-4" in:fade>
				<div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
				<div class="text-muted-foreground font-medium">Loading compliance data from blockchain...</div>
			</div>
		{:else if selectedCompany && complianceBlocks.length === 0}
			<!-- Empty State -->
			<div in:fly={{ y: 30, duration: 600 }}>
				<Card class="border-amber-200 bg-amber-50/50">
					<CardContent class="pt-12 pb-12 text-center">
						<div class="flex flex-col items-center gap-4 max-w-md mx-auto">
							<div class="p-4 bg-amber-100 rounded-full">
								<AlertCircle class="h-12 w-12 text-amber-700" />
							</div>
							<h3 class="font-bold text-xl text-amber-900">No Compliance Data Submitted</h3>
							<p class="text-amber-800 leading-relaxed">
								{companies.find(c => c.id === selectedCompany)?.name} has not submitted any compliance data to the blockchain yet.
								Once they submit compliance reports through the Business Portal, the data will appear here for audit.
							</p>
							<div class="flex gap-3 mt-4">
								<Button variant="outline" onclick={() => goto('/business-portal')}>
									<Building2 class="h-4 w-4 mr-2" />
									Go to Business Portal
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		{:else if selectedCompany && complianceBlocks.length > 0}
			<!-- Company Overview -->
			<div class="mb-8" in:fly={{ y: 30, duration: 600, delay: 100 }}>
				<div class="flex items-center gap-4 mb-6">
					<div class="p-3 bg-primary/10 rounded-xl">
						<Building2 class="h-8 w-8 text-primary" />
					</div>
					<div>
						<h2 class="text-3xl font-bold">
							{companies.find(c => c.id === selectedCompany)?.name}
						</h2>
						<p class="text-muted-foreground">
							{companies.find(c => c.id === selectedCompany)?.industry}
						</p>
					</div>
				</div>

				<!-- Overall Compliance Score -->
				<Card class="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
					<CardContent class="pt-6">
						<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
							<!-- Score Circle -->
							<div class="flex flex-col items-center justify-center">
								<div class="relative">
									<div class="w-32 h-32 rounded-full border-8 {complianceStatus.borderClass} border-opacity-20 flex items-center justify-center bg-background shadow-inner">
										<div class="text-center">
											<div class="text-4xl font-black {complianceStatus.textClass}">
												{complianceScore}
											</div>
											<div class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</div>
										</div>
									</div>
									{#if complianceStatus.level === 'excellent'}
										<div class="absolute -top-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
											<CheckCircle2 class="h-5 w-5" />
										</div>
									{:else if complianceStatus.level === 'critical'}
										<div class="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg">
											<AlertCircle class="h-5 w-5" />
										</div>
									{/if}
								</div>
								<Badge 
									variant="outline" 
									class="mt-4 {complianceStatus.textClass} {complianceStatus.badgeBorderClass} {complianceStatus.bgClass}"
								>
									{complianceStatus.label}
								</Badge>
							</div>

							<!-- Stats -->
							<div class="md:col-span-2 space-y-4">
								<div class="grid grid-cols-2 gap-4">
									<div class="p-4 bg-background border rounded-lg">
										<div class="flex items-center gap-2 text-muted-foreground mb-1">
											<FileText class="h-4 w-4" />
											<span class="text-xs font-medium uppercase tracking-wider">Total Submissions</span>
										</div>
										<div class="text-2xl font-bold">{complianceBlocks.length}</div>
									</div>

									<div class="p-4 bg-background border rounded-lg">
										<div class="flex items-center gap-2 text-muted-foreground mb-1">
											<ShieldCheck class="h-4 w-4" />
											<span class="text-xs font-medium uppercase tracking-wider">Compliance Types</span>
										</div>
										<div class="text-2xl font-bold">
											{new Set(complianceBlocks.map(b => b.data.metadata?.complianceType)).size} / 6
										</div>
									</div>

									<div class="p-4 bg-background border rounded-lg">
										<div class="flex items-center gap-2 text-muted-foreground mb-1">
											<Calendar class="h-4 w-4" />
											<span class="text-xs font-medium uppercase tracking-wider">Last Submission</span>
										</div>
										<div class="text-sm font-semibold">
											{complianceBlocks.length > 0 
												? new Date(Math.max(...complianceBlocks.map(b => b.timestamp))).toLocaleDateString()
												: 'N/A'
											}
										</div>
									</div>

									<div class="p-4 bg-background border rounded-lg">
										<div class="flex items-center gap-2 text-muted-foreground mb-1">
											<Hash class="h-4 w-4" />
											<span class="text-xs font-medium uppercase tracking-wider">Blockchain Verified</span>
										</div>
										<div class="text-sm font-semibold text-green-600">
											{complianceBlocks.length} Blocks
										</div>
									</div>
								</div>

								<div class="flex gap-2">
									<Button variant="outline" class="flex-1 gap-2">
										<Download class="h-4 w-4" />
										Export Report
									</Button>
									<Button variant="outline" class="flex-1 gap-2">
										<Eye class="h-4 w-4" />
										Full Audit
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- Compliance Type Summary -->
			<div class="mb-8" in:fly={{ y: 30, duration: 600, delay: 150 }}>
				<h3 class="text-xl font-bold mb-4">Compliance Coverage</h3>
				<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
					{#each Object.entries(complianceTypeMap) as [key, type]}
						{@const hasSubmission = complianceBlocks.some(b => b.data.metadata?.complianceType === key)}
						<Card class="border-2 {hasSubmission ? 'border-green-200 bg-green-50/50' : 'border-border bg-muted/20'}">
							<CardContent class="pt-6 text-center">
								<div class="flex flex-col items-center gap-2">
									<div class="p-2 {type.bgClass} rounded-lg">
										<svelte:component this={type.icon} class="h-5 w-5 {type.colorClass}" />
									</div>
									<div class="text-xs font-medium">{type.name}</div>
									{#if hasSubmission}
										<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50 text-[10px]">
											<CheckCircle2 class="h-2.5 w-2.5 mr-1" />
											Submitted
										</Badge>
									{:else}
										<Badge variant="outline" class="text-muted-foreground border-border text-[10px]">
											Not Submitted
										</Badge>
									{/if}
								</div>
							</CardContent>
						</Card>
					{/each}
				</div>
			</div>

			<!-- Compliance Sections -->
			<div in:fly={{ y: 30, duration: 600, delay: 200 }}>
				<h3 class="text-2xl font-bold mb-6">Compliance Type Details</h3>
				
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each Object.entries(complianceTypeMap) as [key, type], index}
						{@const typeBlocks = complianceBlocks.filter(b => b.data.metadata?.complianceType === key)}
						{@const hasSubmissions = typeBlocks.length > 0}
						{@const lastSubmission = hasSubmissions ? Math.max(...typeBlocks.map(b => b.timestamp)) : null}
						{@const allHaveDocs = hasSubmissions && typeBlocks.every(b => b.data.documents && b.data.documents.length > 0)}
						{@const anyHaveDocs = hasSubmissions && typeBlocks.some(b => b.data.documents && b.data.documents.length > 0)}
						<div in:fly={{ y: 30, duration: 600, delay: 300 + index * 50 }} class="flex">
							<Card class="hover:shadow-lg transition-shadow border-l-4 {type.borderClass} flex-1 flex flex-col">
								<CardHeader>
									<div class="flex items-start justify-between">
										<div class="flex items-center gap-3 flex-1">
											<div class="p-2 {type.bgClass} rounded-lg">
												<svelte:component 
													this={type.icon} 
													class="h-5 w-5 {type.colorClass}" 
												/>
											</div>
											<div class="flex-1">
												<CardTitle class="text-lg">
													{type.name}
												</CardTitle>
												<CardDescription>
													{hasSubmissions ? `${typeBlocks.length} submission${typeBlocks.length !== 1 ? 's' : ''}` : 'No submissions yet'}
												</CardDescription>
											</div>
										</div>
										<div class="flex gap-2">
											{#if hasSubmissions}
												{#if allHaveDocs}
													<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">
														<CheckCircle2 class="h-3 w-3 mr-1" />
														Verified
													</Badge>
												{:else}
													<Badge variant="outline" class="text-red-600 border-red-200 bg-red-50">
														<AlertCircle class="h-3 w-3 mr-1" />
														Not Verified
													</Badge>
												{/if}
											{:else}
												<Badge variant="outline" class="text-muted-foreground border-border">
													Not Submitted
												</Badge>
											{/if}
										</div>
									</div>
								</CardHeader>
								<CardContent class="space-y-4 flex-1 flex flex-col justify-between">
									<div class="space-y-4">
									<!-- Summary Stats -->
									<div class="grid grid-cols-2 gap-3">
										<div class="p-3 bg-muted/50 rounded-lg">
											<div class="text-xs text-muted-foreground mb-1">Total Blocks</div>
											<div class="text-2xl font-bold">{hasSubmissions ? typeBlocks.length : '0'}</div>
										</div>
										<div class="p-3 bg-muted/50 rounded-lg">
											<div class="text-xs text-muted-foreground mb-1">Last Submission</div>
											<div class="text-sm font-semibold">
												{hasSubmissions ? new Date(lastSubmission!).toLocaleDateString() : 'N/A'}
											</div>
										</div>
									</div>
									</div>

									<!-- See Chain Button -->
									{#if hasSubmissions}
										<Button 
											onclick={() => goto(`/government-portal/${selectedCompany}/${key}`)}
											class="w-full gap-2"
										>
											<Eye class="h-4 w-4" />
											See Full Chain
											<ArrowRight class="h-4 w-4" />
										</Button>
									{:else}
										<Button 
											disabled
											class="w-full gap-2"
										>
											<Eye class="h-4 w-4" />
											No Data Available
										</Button>
									{/if}
								</CardContent>
							</Card>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
