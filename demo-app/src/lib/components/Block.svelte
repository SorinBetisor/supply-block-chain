<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import type { Block, SupplyChainStepData } from '$lib/blockchain/types/types.ts';

	interface Props {
		block: Block;
		isValid?: boolean;
		isTampered?: boolean;
		expanded?: boolean;
	}

	let { block, isValid = true, isTampered = false, expanded = false }: Props = $props();
</script>

<Card class="w-full max-w-4xl mx-auto {isTampered ? 'border-red-500 bg-red-50' : isValid ? 'border-green-500' : 'border-yellow-500'}">
	<CardHeader>
		<div class="flex items-center justify-between">
			<CardTitle class="text-xl font-bold">
				Block #{block.index}
			</CardTitle>
			<div class="flex items-center gap-2">
				{#if isTampered}
					<Badge variant="destructive">TAMPERED</Badge>
				{:else if !isValid}
					<Badge variant="secondary">INVALID</Badge>
				{:else}
					<Badge variant="default">VALID</Badge>
				{/if}
				<Button
					variant="outline"
					size="sm"
					onclick={() => expanded = !expanded}
					class="ml-2"
				>
					{#if expanded}
						▲ Collapse
					{:else}
						▼ Expand
					{/if}
				</Button>
			</div>
		</div>
	</CardHeader>

	<CardContent class="space-y-6">
		<!-- Minimal View -->
		{#if !expanded}
			<div class="space-y-4">
				<!-- Quick Summary -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div class="text-center">
						<div class="text-2xl font-bold text-primary">{block.index}</div>
						<div class="text-sm text-muted-foreground">Block Index</div>
					</div>
					<div class="text-center">
						<div class="text-lg font-semibold truncate" title={block.data.step}>
							{block.data.step}
						</div>
						<div class="text-sm text-muted-foreground">Step</div>
					</div>
					<div class="text-center">
						<div class="text-lg font-semibold truncate" title={block.data.company}>
							{block.data.company}
						</div>
						<div class="text-sm text-muted-foreground">Company</div>
					</div>
				</div>

				<div class="flex justify-between items-center text-sm">
					<span>Hash: <code class="bg-muted px-1 py-0.5 rounded text-xs">{block.hash.substring(0, 16)}...</code></span>
					<span>{new Date(block.timestamp).toLocaleString()}</span>
				</div>

				{#if block.data.certifications && block.data.certifications.length > 0}
					<div class="flex flex-wrap gap-1">
						{#each block.data.certifications as cert}
							<Badge variant="secondary" class="text-xs">{cert.type}</Badge>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<!-- Expanded View -->
			<!-- Block Header Information -->
			<div class="{block.index === 0 ? 'max-w-md mx-auto space-y-6' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}">
				<div class="{block.index === 0 ? 'text-center' : ''}">
					<h4 class="font-semibold text-sm text-muted-foreground mb-2">BLOCK INFO</h4>
					<div class="space-y-2">
						<div class="{block.index === 0 ? 'flex flex-col items-center space-y-1' : 'flex justify-between'}">
							<span class="text-sm font-medium">Index:</span>
							<code class="text-sm bg-muted px-2 py-1 rounded">{block.index}</code>
						</div>
						<div class="{block.index === 0 ? 'flex flex-col items-center space-y-1' : 'flex justify-between'}">
							<span class="text-sm font-medium">Timestamp:</span>
							<span class="text-sm">{new Date(block.timestamp).toLocaleString()}</span>
						</div>
						<div class="{block.index === 0 ? 'flex flex-col items-center space-y-1' : 'flex justify-between'}">
							<span class="text-sm font-medium">Nonce:</span>
							<code class="text-sm bg-muted px-2 py-1 rounded">{block.nonce}</code>
						</div>
					</div>
				</div>

				<div class="{block.index === 0 ? 'text-center' : ''}">
					<h4 class="font-semibold text-sm text-muted-foreground mb-2">HASHES</h4>
					<div class="space-y-2">
						<div>
							<span class="text-sm font-medium">Current Hash:</span>
							<code class="text-xs bg-muted px-2 py-1 rounded break-all block mt-1">
								{block.hash}
							</code>
						</div>
						{#if block.index !== 0}
						<div>
							<span class="text-sm font-medium">Previous Hash:</span>
							<code class="text-xs bg-muted px-2 py-1 rounded break-all block mt-1">
								{block.previousHash}
							</code>
						</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Supply Chain Data -->
			{#if block.index !== 0}
			<Separator />
			<div class="space-y-4">
				<h4 class="font-semibold text-lg">Supply Chain Data</h4>

			<!-- Basic Information -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<h5 class="font-medium text-sm text-muted-foreground mb-2">STEP & COMPANY</h5>
					<div class="space-y-2">
						<div class="flex justify-between">
							<span class="text-sm font-medium">Step:</span>
							<Badge variant="outline">{block.data.step}</Badge>
						</div>
						<div class="flex justify-between">
							<span class="text-sm font-medium">Company:</span>
							<span class="text-sm">{block.data.company}</span>
						</div>
					</div>
				</div>

				<div>
					<h5 class="font-medium text-sm text-muted-foreground mb-2">LOCATION</h5>
					<div class="space-y-1">
						<div class="text-sm">
							<span class="font-medium">Name:</span> {block.data.location.name}
						</div>
						{#if block.data.location.coordinates}
							<div class="text-sm">
								<span class="font-medium">Coordinates:</span>
								{block.data.location.coordinates.lat}, {block.data.location.coordinates.lng}
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Product Information -->
			<div>
				<h5 class="font-medium text-sm text-muted-foreground mb-2">PRODUCT DETAILS</h5>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-muted/50 rounded">
					<div>
						<span class="text-sm font-medium">Name:</span>
						<p class="text-sm">{block.data.product.name}</p>
					</div>
					<div>
						<span class="text-sm font-medium">Quantity:</span>
						<p class="text-sm">{block.data.product.quantity}</p>
					</div>
					<div>
						<span class="text-sm font-medium">Batch ID:</span>
						<code class="text-xs bg-background px-2 py-1 rounded">{block.data.product.batchId}</code>
					</div>
					{#if block.data.product.description}
						<div class="md:col-span-3">
							<span class="text-sm font-medium">Description:</span>
							<p class="text-sm mt-1">{block.data.product.description}</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- Transport Information -->
			{#if block.data.transport}
				<div>
					<h5 class="font-medium text-sm text-muted-foreground mb-2">TRANSPORT INFORMATION</h5>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-muted/50 rounded">
						{#if block.data.transport.vehicleId}
							<div>
								<span class="text-sm font-medium">Vehicle ID:</span>
								<code class="text-xs bg-background px-2 py-1 rounded block mt-1">{block.data.transport.vehicleId}</code>
							</div>
						{/if}
						{#if block.data.transport.route}
							<div>
								<span class="text-sm font-medium">Route:</span>
								<p class="text-sm mt-1">{block.data.transport.route}</p>
							</div>
						{/if}
						{#if block.data.transport.carrier}
							<div>
								<span class="text-sm font-medium">Carrier:</span>
								<p class="text-sm mt-1">{block.data.transport.carrier}</p>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Certifications -->
			{#if block.data.certifications && block.data.certifications.length > 0}
				<div>
					<h5 class="font-medium text-sm text-muted-foreground mb-2">CERTIFICATIONS</h5>
					<div class="flex flex-wrap gap-2">
						{#each block.data.certifications as cert}
							<div class="p-2 border rounded bg-muted/50">
								<div class="flex items-center gap-2 mb-1">
									<Badge variant="secondary">{cert.type}</Badge>
									{#if cert.validUntil}
										<span class="text-xs text-muted-foreground">
											Until: {new Date(cert.validUntil).toLocaleDateString()}
										</span>
									{/if}
								</div>
								<div class="text-xs">
									<span class="font-medium">Issuer:</span> {cert.issuer}
								</div>
								<code class="text-xs bg-background px-1 py-0.5 rounded mt-1 block">
									{cert.certificateId}
								</code>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Documents -->
			{#if block.data.documents && block.data.documents.length > 0}
				<div>
					<h5 class="font-medium text-sm text-muted-foreground mb-2">DOCUMENTS</h5>
					<div class="space-y-2">
						{#each block.data.documents as doc}
							<div class="flex items-center justify-between p-2 border rounded bg-muted/50">
								<div class="flex items-center gap-3">
									<Badge variant="outline">{doc.type}</Badge>
									<code class="text-xs bg-background px-2 py-1 rounded">
										{doc.documentId}
									</code>
								</div>
								<div class="text-xs text-muted-foreground">
									Hash: {doc.documentHash.substring(0, 16)}...
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Additional Metadata -->
			{#if block.data.metadata && Object.keys(block.data.metadata).length > 0}
				<div>
					<h5 class="font-medium text-sm text-muted-foreground mb-2">ADDITIONAL METADATA</h5>
					<pre class="text-xs bg-muted p-2 rounded overflow-auto">
						{JSON.stringify(block.data.metadata, null, 2)}
					</pre>
				</div>
			{/if}
		</div>
		{/if}
		{/if}
	</CardContent>
</Card>
