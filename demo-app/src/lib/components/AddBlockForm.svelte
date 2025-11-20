<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { calculateFileHash } from '$lib/blockchain/utils/utils.ts';
	import type { SupplyChainStepData } from '$lib/blockchain/types/types.ts';

	interface Props {
		onSubmit: (data: SupplyChainStepData) => void;
		onCancel: () => void;
	}

	let { onSubmit, onCancel }: Props = $props();

	// Form state
	let step = $state('');
	let company = $state('');
	let locationName = $state('');
	let locationLat = $state('');
	let locationLng = $state('');
	let productName = $state('');
	let productQuantity = $state(1);
	let batchId = $state('');
	let productDescription = $state('');

	// Optional sections checkboxes
	let includeTransport = $state(false);
	let includeCertifications = $state(false);
	let includeDocuments = $state(false);

	// Transport fields
	let vehicleId = $state('');
	let route = $state('');
	let carrier = $state('');

	// Certification fields
	let certifications = $state<
		Array<{
			type: string;
			issuer: string;
			certificateId: string;
			validUntil: string;
		}>
	>([]);

	// Document fields
	let documents = $state<
		Array<{
			file: File;
			type: string;
			documentId: string;
			hash: string;
		}>
	>([]);

	// Add certification
	function addCertification() {
		certifications = [
			...certifications,
			{ type: '', issuer: '', certificateId: '', validUntil: '' }
		];
	}

	// Remove certification
	function removeCertification(index: number) {
		certifications = certifications.filter((_, i) => i !== index);
	}

	// Handle file upload
	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (!files) return;

		for (const file of Array.from(files)) {
			try {
				const hash = await calculateFileHash(file);
				const documentId = `DOC-${Date.now()}-${Math.random().toString(36).substring(7)}`;
				documents = [
					...documents,
					{
						file,
						type: file.type || 'DOCUMENT',
						documentId,
						hash
					}
				];
			} catch (error) {
				console.error('Error hashing file:', error);
				alert(`Failed to process file ${file.name}`);
			}
		}
		// Reset input
		target.value = '';
	}

	// Remove document
	function removeDocument(index: number) {
		documents = documents.filter((_, i) => i !== index);
	}

	async function handleSubmit() {
		if (!step || !company || !locationName || !productName || !batchId) {
			alert('Please fill in all required fields (Step, Company, Location, Product Name, Batch ID)');
			return;
		}

		// Validate certifications if included
		if (includeCertifications) {
			for (const cert of certifications) {
				if (!cert.type || !cert.issuer || !cert.certificateId) {
					alert('Please fill in all certification fields (Type, Issuer, Certificate ID)');
					return;
				}
			}
		}

		const data: SupplyChainStepData = {
			step,
			company,
			location: {
				name: locationName,
				coordinates:
					locationLat && locationLng
						? {
								lat: parseFloat(locationLat),
								lng: parseFloat(locationLng)
							}
						: undefined
			},
			product: {
				name: productName,
				quantity: productQuantity,
				batchId,
				description: productDescription || undefined
			},
			transport:
				includeTransport && (vehicleId || route || carrier)
					? {
							vehicleId: vehicleId || undefined,
							route: route || undefined,
							carrier: carrier || undefined
						}
					: undefined,
			certifications:
				includeCertifications && certifications.length > 0
					? certifications.map((cert) => ({
							type: cert.type,
							issuer: cert.issuer,
							certificateId: cert.certificateId,
							validUntil: cert.validUntil || undefined
						}))
					: undefined,
			documents:
				includeDocuments && documents.length > 0
					? documents.map((doc) => ({
							type: doc.type,
							documentHash: doc.hash,
							documentId: doc.documentId,
							url: undefined // Could be added later for file storage
						}))
					: undefined
		};

		onSubmit(data);
	}

	function handleCancel() {
		// Reset form
		step = '';
		company = '';
		locationName = '';
		locationLat = '';
		locationLng = '';
		productName = '';
		productQuantity = 1;
		batchId = '';
		productDescription = '';
		includeTransport = false;
		includeCertifications = false;
		includeDocuments = false;
		vehicleId = '';
		route = '';
		carrier = '';
		certifications = [];
		documents = [];
		onCancel();
	}
</script>

<div class="space-y-6">
	<div class="space-y-4">
		<!-- Basic Information -->
		<div>
			<h3 class="text-lg font-semibold mb-4">Basic Information</h3>
			<div class="space-y-4">
				<div>
					<Label for="step">Step *</Label>
					<Input
						id="step"
						bind:value={step}
						placeholder="e.g., Cotton Farm, Textile Factory, Manufacturing"
						required
					/>
				</div>
				<div>
					<Label for="company">Company *</Label>
					<Input id="company" bind:value={company} placeholder="Company/Entity name" required />
				</div>
				<div>
					<Label for="locationName">Location Name *</Label>
					<Input id="locationName" bind:value={locationName} placeholder="e.g., Texas, USA" required />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<Label for="locationLat">Latitude (optional)</Label>
						<Input
							id="locationLat"
							type="number"
							step="any"
							bind:value={locationLat}
							placeholder="e.g., 31.9686"
						/>
					</div>
					<div>
						<Label for="locationLng">Longitude (optional)</Label>
						<Input
							id="locationLng"
							type="number"
							step="any"
							bind:value={locationLng}
							placeholder="e.g., -99.9018"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Product Details -->
		<div>
			<h3 class="text-lg font-semibold mb-4">Product Details</h3>
			<div class="space-y-4">
				<div>
					<Label for="productName">Product Name *</Label>
					<Input id="productName" bind:value={productName} placeholder="e.g., Zara Sweatshirt" required />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<Label for="productQuantity">Quantity *</Label>
						<Input
							id="productQuantity"
							type="number"
							min="1"
							bind:value={productQuantity}
							required
						/>
					</div>
					<div>
						<Label for="batchId">Batch ID *</Label>
						<Input id="batchId" bind:value={batchId} placeholder="e.g., BATCH-2024-001" required />
					</div>
				</div>
				<div>
					<Label for="productDescription">Description (optional)</Label>
					<Textarea
						id="productDescription"
						bind:value={productDescription}
						placeholder="Product description"
					/>
				</div>
			</div>
		</div>

		<!-- Transport Information (Optional) -->
		<div class="border rounded-lg p-4">
			<label class="flex items-center gap-2 cursor-pointer mb-4">
				<input
					type="checkbox"
					bind:checked={includeTransport}
					class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
				/>
				<h3 class="text-lg font-semibold">Transportation Used?</h3>
			</label>
			{#if includeTransport}
				<div class="space-y-4 mt-4">
					<div>
						<Label for="vehicleId">Vehicle ID</Label>
						<Input id="vehicleId" bind:value={vehicleId} placeholder="e.g., TRUCK-789" />
					</div>
					<div>
						<Label for="route">Route</Label>
						<Input id="route" bind:value={route} placeholder="e.g., Texas → North Carolina" />
					</div>
					<div>
						<Label for="carrier">Carrier</Label>
						<Input id="carrier" bind:value={carrier} placeholder="e.g., Green Logistics LLC" />
					</div>
				</div>
			{/if}
		</div>

		<!-- Certifications (Optional) -->
		<div class="border rounded-lg p-4">
			<label class="flex items-center gap-2 cursor-pointer mb-4">
				<input
					type="checkbox"
					bind:checked={includeCertifications}
					class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
				/>
				<h3 class="text-lg font-semibold">Certifications</h3>
			</label>
			{#if includeCertifications}
				<div class="space-y-4 mt-4">
					{#each certifications as cert, index}
						<div class="border rounded p-4 space-y-3">
							<div class="flex justify-between items-center mb-2">
								<span class="font-medium">Certification #{index + 1}</span>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onclick={() => removeCertification(index)}
								>
									Remove
								</Button>
							</div>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<Label for="cert-type-{index}">Type *</Label>
									<Input
										id="cert-type-{index}"
										bind:value={cert.type}
										placeholder="e.g., ORGANIC, BIO, CO2_NEUTRAL"
									/>
								</div>
								<div>
									<Label for="cert-issuer-{index}">Issuer *</Label>
									<Input
										id="cert-issuer-{index}"
										bind:value={cert.issuer}
										placeholder="e.g., USDA Organic"
									/>
								</div>
							</div>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<Label for="cert-id-{index}">Certificate ID *</Label>
									<Input
										id="cert-id-{index}"
										bind:value={cert.certificateId}
										placeholder="e.g., USDA-ORG-2024-12345"
									/>
								</div>
								<div>
									<Label for="cert-valid-{index}">Valid Until (optional)</Label>
									<Input
										id="cert-valid-{index}"
										type="date"
										bind:value={cert.validUntil}
									/>
								</div>
							</div>
						</div>
					{/each}
					<Button type="button" variant="outline" onclick={addCertification} class="w-full">
						+ Add Certification
					</Button>
				</div>
			{/if}
		</div>

		<!-- Documents (Optional) -->
		<div class="border rounded-lg p-4">
			<label class="flex items-center gap-2 cursor-pointer mb-4">
				<input
					type="checkbox"
					bind:checked={includeDocuments}
					class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
				/>
				<h3 class="text-lg font-semibold">Legal Documentation</h3>
			</label>
			{#if includeDocuments}
				<div class="space-y-4 mt-4">
					<div>
						<Label for="file-upload">Upload Documents</Label>
						<Input
							id="file-upload"
							type="file"
							multiple
							accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
							onchange={handleFileUpload}
							class="cursor-pointer"
						/>
						<p class="text-sm text-muted-foreground mt-1">
							Upload legal documents, certificates, invoices, etc. Files will be hashed and stored securely.
						</p>
					</div>
					{#if documents.length > 0}
						<div class="space-y-2">
							<h4 class="font-medium">Uploaded Documents:</h4>
							{#each documents as doc, index}
								<div class="flex items-center justify-between p-3 border rounded bg-muted/50">
									<div class="flex-1">
										<p class="font-medium text-sm">{doc.file.name}</p>
										<p class="text-xs text-muted-foreground">
											Type: {doc.type} | ID: {doc.documentId}
										</p>
										<p class="text-xs text-muted-foreground font-mono">
											Hash: {doc.hash.substring(0, 16)}...
										</p>
									</div>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onclick={() => removeDocument(index)}
										class="ml-2"
									>
										×
									</Button>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="flex justify-end gap-3 pt-4 border-t">
		<Button variant="outline" onclick={handleCancel}>Cancel</Button>
		<Button onclick={handleSubmit}>Add Block</Button>
	</div>
</div>

