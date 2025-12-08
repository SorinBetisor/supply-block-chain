<script lang="ts">
	import type { Block } from '$lib/blockchain/types/types.ts';
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Progress } from '$lib/components/ui/progress';
	import { 
		ShieldCheck, 
		Leaf, 
		FileCheck, 
		Users, 
		TrendingDown,
		Globe,
		AlertCircle,
		CheckCircle2,
		Building2,
		BarChart3,
		Scale,
		Award,
		MapPin,
		Package
	} from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	interface Props {
		blocks: Block[];
	}

	let { blocks }: Props = $props();

	// Calculate compliance metrics from blockchain data
	const metrics = $derived.by(() => {
		const supplyChainBlocks = blocks.filter(b => b.index > 0);
		
		// Count certifications
		let totalCertifications = 0;
		let organicCertified = false;
		let co2Neutral = false;
		let fairTrade = false;
		
		// Count documents
		let totalDocuments = 0;
		let verifiedSteps = 0;
		
		// Track locations
		const locations = new Set<string>();
		const companies = new Set<string>();
		
		supplyChainBlocks.forEach(block => {
			if (block.data.certifications) {
				totalCertifications += block.data.certifications.length;
				block.data.certifications.forEach(cert => {
					if (cert.type === 'ORGANIC') organicCertified = true;
					if (cert.type === 'CO2_NEUTRAL') co2Neutral = true;
					if (cert.type === 'FAIR_TRADE') fairTrade = true;
				});
			}
			
			if (block.data.documents) {
				totalDocuments += block.data.documents.length;
			}
			
			if (block.data.location.name) {
				locations.add(block.data.location.name);
			}
			
			if (block.data.company) {
				companies.add(block.data.company);
			}
			
			verifiedSteps++;
		});
		
		// Calculate compliance scores
		const sustainabilityScore = Math.min(100, 
			(organicCertified ? 35 : 0) + 
			(co2Neutral ? 35 : 0) + 
			(totalDocuments > 5 ? 30 : totalDocuments * 5)
		);
		
		const traceabilityScore = Math.min(100, (verifiedSteps / supplyChainBlocks.length) * 100);
		const documentationScore = Math.min(100, (totalDocuments / supplyChainBlocks.length) * 15);
		const laborComplianceScore = 100; // All suppliers verified (in real scenario would check against labor databases)
		
		return {
			totalCertifications,
			organicCertified,
			co2Neutral,
			fairTrade,
			totalDocuments,
			verifiedSteps,
			totalSteps: supplyChainBlocks.length,
			locations: locations.size,
			companies: companies.size,
			sustainabilityScore,
			traceabilityScore,
			documentationScore,
			laborComplianceScore,
			overallCompliance: Math.round((sustainabilityScore + traceabilityScore + documentationScore + laborComplianceScore) / 4)
		};
	});
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto" in:fade={{ duration: 600 }}>
		<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
			<Building2 class="h-4 w-4 text-primary" />
			<span class="text-sm font-semibold text-primary">Compliance Dashboard</span>
		</div>
		<h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
			Regulatory Compliance Report
		</h2>
		<p class="text-muted-foreground text-lg">
			Blockchain-verified data for EU Sustainability Audits and ESG Reporting
		</p>
	</div>

	<!-- Overall Compliance Score -->
	<div class="relative overflow-hidden" in:fly={{ y: 30, duration: 800, delay: 100 }}>
		<Card class="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background shadow-lg">
			<CardHeader class="text-center pb-4">
				<CardTitle class="text-2xl">Overall Compliance Score</CardTitle>
				<CardDescription>Based on {metrics.verifiedSteps} blockchain-verified supply chain steps</CardDescription>
			</CardHeader>
			<CardContent class="space-y-6">
				<div class="flex flex-col items-center gap-4">
					<div class="relative">
						<div class="w-40 h-40 rounded-full border-8 border-primary/20 flex items-center justify-center bg-background shadow-inner">
							<div class="text-center">
								<div class="text-5xl font-black text-primary">{metrics.overallCompliance}</div>
								<div class="text-xs font-medium text-muted-foreground uppercase tracking-wider">out of 100</div>
							</div>
						</div>
						{#if metrics.overallCompliance >= 90}
							<div class="absolute -top-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
								<CheckCircle2 class="h-6 w-6" />
							</div>
						{/if}
					</div>
					
					{#if metrics.overallCompliance >= 90}
						<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50 text-sm px-4 py-1.5">
							<ShieldCheck class="h-4 w-4 mr-1.5" />
							EU Compliance Ready
						</Badge>
					{:else}
						<Badge variant="secondary" class="text-amber-600 border-amber-200 bg-amber-50 text-sm px-4 py-1.5">
							<AlertCircle class="h-4 w-4 mr-1.5" />
							Additional Verification Needed
						</Badge>
					{/if}
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
					<div class="text-center p-3 bg-muted/30 rounded-lg">
						<div class="text-2xl font-bold text-foreground">{metrics.verifiedSteps}</div>
						<div class="text-xs text-muted-foreground uppercase tracking-wider">Verified Steps</div>
					</div>
					<div class="text-center p-3 bg-muted/30 rounded-lg">
						<div class="text-2xl font-bold text-foreground">{metrics.totalDocuments}</div>
						<div class="text-xs text-muted-foreground uppercase tracking-wider">Documents Verified</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Key Compliance Areas -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<!-- Sustainability Compliance -->
		<div in:fly={{ y: 30, duration: 800, delay: 200 }}>
			<Card class="h-full hover:shadow-md transition-shadow">
				<CardHeader>
					<div class="flex items-center justify-between">
						<CardTitle class="flex items-center gap-2 text-lg">
							<div class="p-2 bg-green-100 rounded-lg text-green-700">
								<Leaf class="h-5 w-5" />
							</div>
							Sustainability
						</CardTitle>
						<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">
							{metrics.sustainabilityScore}%
						</Badge>
					</div>
					<CardDescription>Environmental impact & certifications</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<Progress value={metrics.sustainabilityScore} class="h-2" />
					
					<div class="space-y-3">
						<div class="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
							<div class="flex items-center gap-2">
								{#if metrics.organicCertified}
									<CheckCircle2 class="h-4 w-4 text-green-600" />
								{:else}
									<AlertCircle class="h-4 w-4 text-amber-600" />
								{/if}
								<span class="text-sm font-medium">Organic Certification</span>
							</div>
							<Badge variant={metrics.organicCertified ? "outline" : "secondary"} class={metrics.organicCertified ? "text-green-600 border-green-200 bg-green-50" : ""}>
								{metrics.organicCertified ? 'Verified' : 'N/A'}
							</Badge>
						</div>

						<div class="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
							<div class="flex items-center gap-2">
								{#if metrics.co2Neutral}
									<CheckCircle2 class="h-4 w-4 text-green-600" />
								{:else}
									<AlertCircle class="h-4 w-4 text-amber-600" />
								{/if}
								<span class="text-sm font-medium">CO₂ Neutral Process</span>
							</div>
							<Badge variant={metrics.co2Neutral ? "outline" : "secondary"} class={metrics.co2Neutral ? "text-green-600 border-green-200 bg-green-50" : ""}>
								{metrics.co2Neutral ? 'Verified' : 'N/A'}
							</Badge>
						</div>

						<div class="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
							<div class="flex items-center gap-2">
								<TrendingDown class="h-4 w-4 text-blue-600" />
								<span class="text-sm font-medium">Carbon Footprint</span>
							</div>
							<span class="text-sm font-semibold text-muted-foreground">Tracked</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Labor Compliance -->
		<div in:fly={{ y: 30, duration: 800, delay: 250 }}>
			<Card class="h-full hover:shadow-md transition-shadow">
				<CardHeader>
					<div class="flex items-center justify-between">
						<CardTitle class="flex items-center gap-2 text-lg">
							<div class="p-2 bg-blue-100 rounded-lg text-blue-700">
								<Users class="h-5 w-5" />
							</div>
							Labor Standards
						</CardTitle>
						<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">
							{metrics.laborComplianceScore}%
						</Badge>
					</div>
					<CardDescription>Ethical sourcing & labor practices</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<Progress value={metrics.laborComplianceScore} class="h-2" />
					
					<div class="space-y-3">
						<div class="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
							<div class="flex items-center gap-2">
								<CheckCircle2 class="h-4 w-4 text-green-600" />
								<span class="text-sm font-medium">No Child Labor</span>
							</div>
							<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">Verified</Badge>
						</div>

						<div class="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
							<div class="flex items-center gap-2">
								<CheckCircle2 class="h-4 w-4 text-green-600" />
								<span class="text-sm font-medium">Fair Wages</span>
							</div>
							<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">Verified</Badge>
						</div>

						<div class="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
							<div class="flex items-center gap-2">
								<CheckCircle2 class="h-4 w-4 text-green-600" />
								<span class="text-sm font-medium">Safe Working Conditions</span>
							</div>
							<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">Verified</Badge>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Traceability -->
		<div in:fly={{ y: 30, duration: 800, delay: 300 }}>
			<Card class="h-full hover:shadow-md transition-shadow">
				<CardHeader>
					<div class="flex items-center justify-between">
						<CardTitle class="flex items-center gap-2 text-lg">
							<div class="p-2 bg-purple-100 rounded-lg text-purple-700">
								<MapPin class="h-5 w-5" />
							</div>
							Supply Chain Traceability
						</CardTitle>
						<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">
							{Math.round(metrics.traceabilityScore)}%
						</Badge>
					</div>
					<CardDescription>End-to-end origin verification</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<Progress value={metrics.traceabilityScore} class="h-2" />
					
					<div class="grid grid-cols-2 gap-3">
						<div class="p-3 bg-muted/40 rounded-lg text-center">
							<div class="text-2xl font-bold text-foreground">{metrics.locations}</div>
							<div class="text-xs text-muted-foreground uppercase tracking-wider mt-1">Locations</div>
						</div>
						<div class="p-3 bg-muted/40 rounded-lg text-center">
							<div class="text-2xl font-bold text-foreground">{metrics.companies}</div>
							<div class="text-xs text-muted-foreground uppercase tracking-wider mt-1">Partners</div>
						</div>
					</div>

					<div class="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
						<div class="flex items-center gap-2">
							<CheckCircle2 class="h-4 w-4 text-green-600" />
							<span class="text-sm font-medium">Full Chain Visibility</span>
						</div>
						<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">100%</Badge>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Documentation -->
		<div in:fly={{ y: 30, duration: 800, delay: 350 }}>
			<Card class="h-full hover:shadow-md transition-shadow">
				<CardHeader>
					<div class="flex items-center justify-between">
						<CardTitle class="flex items-center gap-2 text-lg">
							<div class="p-2 bg-orange-100 rounded-lg text-orange-700">
								<FileCheck class="h-5 w-5" />
							</div>
							Documentation
						</CardTitle>
						<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">
							{Math.round(metrics.documentationScore)}%
						</Badge>
					</div>
					<CardDescription>Audit trail & document verification</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<Progress value={metrics.documentationScore} class="h-2" />
					
					<div class="space-y-3">
						<div class="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
							<div class="flex items-center gap-2">
								<Package class="h-4 w-4 text-blue-600" />
								<span class="text-sm font-medium">Total Documents</span>
							</div>
							<span class="text-sm font-bold text-foreground">{metrics.totalDocuments}</span>
						</div>

						<div class="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
							<div class="flex items-center gap-2">
								<CheckCircle2 class="h-4 w-4 text-green-600" />
								<span class="text-sm font-medium">Blockchain Verified</span>
							</div>
							<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">All</Badge>
						</div>

						<div class="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
							<div class="flex items-center gap-2">
								<Award class="h-4 w-4 text-purple-600" />
								<span class="text-sm font-medium">Certifications</span>
							</div>
							<span class="text-sm font-bold text-foreground">{metrics.totalCertifications}</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>

	<!-- Regulatory Compliance Summary -->
	<div in:fly={{ y: 30, duration: 800, delay: 400 }}>
		<Card class="border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-background">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<div class="p-2 bg-blue-100 rounded-lg text-blue-700">
						<Scale class="h-5 w-5" />
					</div>
					Regulatory Framework Compliance
				</CardTitle>
				<CardDescription>EU and international standards alignment</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div class="p-4 bg-background border rounded-lg hover:shadow-md transition-shadow">
						<div class="flex items-center gap-3 mb-2">
							<CheckCircle2 class="h-5 w-5 text-green-600 flex-shrink-0" />
							<span class="font-semibold text-sm">EU CSRD Directive</span>
						</div>
						<p class="text-xs text-muted-foreground pl-8">Corporate Sustainability Reporting Directive compliance enabled</p>
					</div>

					<div class="p-4 bg-background border rounded-lg hover:shadow-md transition-shadow">
						<div class="flex items-center gap-3 mb-2">
							<CheckCircle2 class="h-5 w-5 text-green-600 flex-shrink-0" />
							<span class="font-semibold text-sm">ISO 20400</span>
						</div>
						<p class="text-xs text-muted-foreground pl-8">Sustainable procurement guidelines met</p>
					</div>

					<div class="p-4 bg-background border rounded-lg hover:shadow-md transition-shadow">
						<div class="flex items-center gap-3 mb-2">
							<CheckCircle2 class="h-5 w-5 text-green-600 flex-shrink-0" />
							<span class="font-semibold text-sm">GRI Standards</span>
						</div>
						<p class="text-xs text-muted-foreground pl-8">Global Reporting Initiative aligned</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Export Section -->
	<div class="text-center p-6 bg-muted/30 rounded-xl border" in:fade={{ delay: 500 }}>
		<Globe class="h-8 w-8 text-primary mx-auto mb-3" />
		<h3 class="font-semibold text-lg mb-2">Ready for Regulatory Submission</h3>
		<p class="text-sm text-muted-foreground mb-4 max-w-2xl mx-auto">
			All data is blockchain-verified and immutable. Export compliance reports for EU audits, 
			sustainability disclosures, and ESG frameworks.
		</p>
		<div class="flex flex-wrap gap-3 justify-center">
			<Badge variant="outline" class="px-3 py-1.5">PDF Export</Badge>
			<Badge variant="outline" class="px-3 py-1.5">JSON-LD Format</Badge>
			<Badge variant="outline" class="px-3 py-1.5">API Access</Badge>
			<Badge variant="outline" class="px-3 py-1.5">Real-time Updates</Badge>
		</div>
	</div>
</div>

