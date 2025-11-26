<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import type { Block, SupplyChainStepData } from '$lib/blockchain/types/types.ts';
	import { 
		ChevronDown, 
		ChevronUp, 
		Hash, 
		Clock, 
		MapPin, 
		Box, 
		Truck, 
		FileCheck, 
		FileText, 
		Database,
		ShieldAlert,
		ShieldCheck,
		AlertTriangle
	} from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		block: Block;
		isValid?: boolean;
		isTampered?: boolean;
		expanded?: boolean;
	}

	let { block, isValid = true, isTampered = false, expanded = $bindable(false) }: Props = $props();
</script>

<Card class="w-full max-w-4xl mx-auto transition-all duration-300 {isTampered ? 'border-destructive/50 bg-destructive/5 shadow-destructive/10' : isValid ? 'border-green-500/30 hover:border-green-500/50 shadow-sm hover:shadow-md' : 'border-yellow-500/50 bg-yellow-500/5'}">
	<CardHeader class="pb-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="flex items-center justify-center w-10 h-10 rounded-full {block.index === 0 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}">
					<span class="font-bold text-lg">#{block.index}</span>
				</div>
				<div>
					<CardTitle class="text-lg font-bold leading-none mb-1">
						{block.index === 0 ? 'Genesis Block' : block.data.step}
					</CardTitle>
					<div class="text-xs text-muted-foreground flex items-center gap-1">
						<Clock class="h-3 w-3" />
						{new Date(block.timestamp).toLocaleString()}
					</div>
				</div>
			</div>
			
			<div class="flex items-center gap-2">
				{#if isTampered}
					<Badge variant="destructive" class="gap-1"><ShieldAlert class="h-3 w-3" /> TAMPERED</Badge>
				{:else if !isValid}
					<Badge variant="secondary" class="gap-1"><AlertTriangle class="h-3 w-3" /> INVALID</Badge>
				{:else}
					<Badge variant="outline" class="gap-1 text-green-600 border-green-200 bg-green-50"><ShieldCheck class="h-3 w-3" /> VERIFIED</Badge>
				{/if}
				<Button
					variant="ghost"
					size="icon"
					onclick={() => expanded = !expanded}
					class="ml-1 h-8 w-8"
				>
					{#if expanded}
						<ChevronUp class="h-4 w-4" />
					{:else}
						<ChevronDown class="h-4 w-4" />
					{/if}
				</Button>
			</div>
		</div>
	</CardHeader>

	<CardContent class="pb-6">
		<!-- Minimal View -->
		{#if !expanded}
			<div class="space-y-4" in:slide>
				{#if block.index !== 0}
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
						<div class="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
							<div class="p-1.5 bg-background rounded-md shadow-sm text-primary">
								<Box class="h-4 w-4" />
							</div>
							<div class="flex flex-col">
								<span class="text-xs text-muted-foreground">Company</span>
								<span class="font-medium">{block.data.company}</span>
							</div>
						</div>
						<div class="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
							<div class="p-1.5 bg-background rounded-md shadow-sm text-primary">
								<MapPin class="h-4 w-4" />
							</div>
							<div class="flex flex-col">
								<span class="text-xs text-muted-foreground">Location</span>
								<span class="font-medium truncate">{block.data.location.name}</span>
							</div>
						</div>
					</div>
				{/if}

				<div class="flex items-center gap-2 text-xs text-muted-foreground bg-muted/20 p-2 rounded border border-border/50">
					<Hash class="h-3 w-3" />
					<span class="font-mono truncate">{block.hash}</span>
				</div>
			</div>
		{:else}
			<!-- Expanded View -->
			<div class="space-y-6" in:slide>
				<!-- Block Header Information -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-xl border border-border/50">
					<div>
						<h4 class="font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
							<Database class="h-3 w-3" /> Block Info
						</h4>
						<div class="space-y-2 text-sm">
							<div class="flex justify-between py-1 border-b border-border/50">
								<span class="text-muted-foreground">Index</span>
								<code class="font-mono font-bold">{block.index}</code>
							</div>
							<div class="flex justify-between py-1 border-b border-border/50">
								<span class="text-muted-foreground">Previous Hash</span>
								<span class="font-mono text-xs break-all text-right pl-4" title={block.previousHash}>
									{block.previousHash}
								</span>
							</div>
						</div>
					</div>

					<div>
						<h4 class="font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
							<Hash class="h-3 w-3" /> Current Hash
						</h4>
						<div class="bg-background p-3 rounded-lg border border-border/50 shadow-sm">
							<code class="text-xs font-mono break-all text-primary">
								{block.hash}
							</code>
						</div>
					</div>
				</div>

				<!-- Supply Chain Data -->
				{#if block.index !== 0}
				<div class="space-y-6">
					<div class="flex items-center gap-2">
						<div class="h-px flex-1 bg-border"></div>
						<span class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Supply Chain Data</span>
						<div class="h-px flex-1 bg-border"></div>
					</div>

					<!-- Product & Location -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="space-y-4">
							<h5 class="font-medium text-sm flex items-center gap-2 text-primary">
								<Box class="h-4 w-4" /> Product Details
							</h5>
							<div class="bg-card border rounded-xl p-4 space-y-3 shadow-sm">
								<div class="grid grid-cols-2 gap-2">
									<div>
										<span class="text-xs text-muted-foreground block">Name</span>
										<span class="text-sm font-medium">{block.data.product.name}</span>
									</div>
									<div>
										<span class="text-xs text-muted-foreground block">Quantity</span>
										<span class="text-sm font-medium">{block.data.product.quantity}</span>
									</div>
								</div>
								<div>
									<span class="text-xs text-muted-foreground block">Batch ID</span>
									<code class="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">{block.data.product.batchId}</code>
								</div>
								{#if block.data.product.description}
									<div class="pt-2 border-t border-border/50">
										<span class="text-xs text-muted-foreground block">Description</span>
										<p class="text-sm mt-1 text-foreground/90">{block.data.product.description}</p>
									</div>
								{/if}
							</div>
						</div>

						<div class="space-y-4">
							<h5 class="font-medium text-sm flex items-center gap-2 text-primary">
								<MapPin class="h-4 w-4" /> Location & Company
							</h5>
							<div class="bg-card border rounded-xl p-4 space-y-3 shadow-sm">
								<div>
									<span class="text-xs text-muted-foreground block">Company</span>
									<span class="text-sm font-medium">{block.data.company}</span>
								</div>
								<div>
									<span class="text-xs text-muted-foreground block">Location</span>
									<span class="text-sm font-medium">{block.data.location.name}</span>
								</div>
								{#if block.data.location.coordinates}
									<div class="pt-2 border-t border-border/50">
										<span class="text-xs text-muted-foreground block">Coordinates</span>
										<code class="text-xs text-muted-foreground mt-1 inline-block">
											{block.data.location.coordinates.lat}, {block.data.location.coordinates.lng}
										</code>
									</div>
								{/if}
							</div>
						</div>
					</div>

					<!-- Transport Information -->
					{#if block.data.transport}
						<div class="space-y-3">
							<h5 class="font-medium text-sm flex items-center gap-2 text-primary">
								<Truck class="h-4 w-4" /> Transport Information
							</h5>
							<div class="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
								{#if block.data.transport.vehicleId}
									<div>
										<span class="text-xs text-muted-foreground block">Vehicle ID</span>
										<code class="text-xs bg-background/50 px-2 py-1 rounded block mt-1 w-fit">{block.data.transport.vehicleId}</code>
									</div>
								{/if}
								{#if block.data.transport.route}
									<div>
										<span class="text-xs text-muted-foreground block">Route</span>
										<p class="text-sm mt-1 font-medium">{block.data.transport.route}</p>
									</div>
								{/if}
								{#if block.data.transport.carrier}
									<div>
										<span class="text-xs text-muted-foreground block">Carrier</span>
										<p class="text-sm mt-1 font-medium">{block.data.transport.carrier}</p>
									</div>
								{/if}
							</div>
						</div>
					{/if}

					<!-- Certifications & Documents -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						{#if block.data.certifications && block.data.certifications.length > 0}
							<div class="space-y-3">
								<h5 class="font-medium text-sm flex items-center gap-2 text-primary">
									<FileCheck class="h-4 w-4" /> Certifications
								</h5>
								<div class="space-y-2">
									{#each block.data.certifications as cert}
										<div class="p-3 border rounded-lg bg-card shadow-sm flex flex-col gap-2">
											<div class="flex items-center justify-between">
												<Badge variant="secondary" class="font-normal">{cert.type}</Badge>
												{#if cert.validUntil}
													<span class="text-xs text-muted-foreground">
														Exp: {new Date(cert.validUntil).toLocaleDateString()}
													</span>
												{/if}
											</div>
											<div class="text-xs">
												<span class="text-muted-foreground">Issuer:</span> {cert.issuer}
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}

						{#if block.data.documents && block.data.documents.length > 0}
							<div class="space-y-3">
								<h5 class="font-medium text-sm flex items-center gap-2 text-primary">
									<FileText class="h-4 w-4" /> Documents
								</h5>
								<div class="space-y-2">
									{#each block.data.documents as doc}
										<div class="p-3 border rounded-lg bg-card shadow-sm flex items-center justify-between">
											<div class="flex items-center gap-3">
												<div class="p-2 bg-muted rounded-md">
													<FileText class="h-4 w-4 text-muted-foreground" />
												</div>
												<div>
													<div class="text-sm font-medium">{doc.type}</div>
													<code class="text-[10px] text-muted-foreground">{doc.documentId}</code>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
				{/if}
			</div>
		{/if}
	</CardContent>
</Card>
