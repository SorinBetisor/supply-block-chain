<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { goto } from '$app/navigation';
	import { Blockchain } from '$lib/blockchain';
	import type { SupplyChainStepData } from '$lib/blockchain/types/types.ts';
	import { 
		Building2, 
		ArrowLeft, 
		Plus,
		Leaf,
		Users,
		Droplet,
		Zap,
		Truck,
		Factory,
		Shield,
		FileText,
		CheckCircle2,
		Calculator,
		MapPin,
		Upload,
		File,
		X,
		Recycle
	} from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	let blockchain = new Blockchain();
	let isSubmitting = false;
	let showSuccess = false;
	let selectedComplianceType = $state<string | null>(null);

	// Form data states
	let co2FormData = $state({
		transportMethod: '',
		vehicleCount: '',
		fromLocation: '',
		toLocation: '',
		distance: '',
		loadWeight: '',
		fuelType: '',
		fuelConsumed: '',
		calculatedEmissions: '',
		date: new Date().toISOString().split('T')[0]
	});

	let laborFormData = $state({
		facility: '',
		location: '',
		employeeCount: '',
		minimumWage: '',
		averageWage: '',
		workingHours: '',
		safetyIncidents: '',
		childLaborCheck: 'no',
		certifications: '',
		auditDate: '',
		auditor: '',
		notes: ''
	});

	let waterFormData = $state({
		source: '',
		location: '',
		volumeUsed: '',
		wastewaterTreated: '',
		treatmentMethod: '',
		certifications: '',
		notes: '',
		period: '',
		waterSource: ''
	});

	let energyFormData = $state({
		energySource: '',
		totalConsumption: '',
		renewablePercentage: '',
		efficiencyMeasures: '',
		certifications: '',
		notes: ''
	});

	let materialsFormData = $state({
		materialType: '',
		quantity: '',
		supplier: '',
		origin: '',
		certification: '',
		sustainabilityScore: '',
		traceabilityDoc: '',
		notes: ''
	});

	let wasteFormData = $state({
		wasteType: '',
		totalWaste: '',
		recycledPercentage: '',
		disposalMethod: '',
		certifications: '',
		notes: ''
	});

	let uploadedFiles: { name: string; size: number; hash: string }[] = $state([]);

	const complianceTypes = [
		{
			id: 'co2',
			name: 'CO₂ Emissions',
			icon: Leaf,
			color: 'green',
			regulation: 'EU CSRD Directive',
			description: 'Transportation and carbon footprint tracking'
		},
		{
			id: 'labor',
			name: 'Labor Standards',
			icon: Users,
			color: 'blue',
			regulation: 'EU Due Diligence Directive',
			description: 'Fair wages, no child labor, safe conditions'
		},
		{
			id: 'water',
			name: 'Water Usage',
			icon: Droplet,
			color: 'cyan',
			regulation: 'EU Water Framework',
			description: 'Water consumption and wastewater management'
		},
		{
			id: 'energy',
			name: 'Energy Consumption',
			icon: Zap,
			color: 'yellow',
			regulation: 'Energy Efficiency Directive',
			description: 'Renewable energy mix and consumption metrics'
		},
		{
			id: 'materials',
			name: 'Material Sourcing',
			icon: Factory,
			color: 'purple',
			regulation: 'Digital Product Passport',
			description: 'Raw material origin and sustainability'
		},
		{
			id: 'waste',
			name: 'Waste Management',
			icon: Recycle,
			color: 'orange',
			regulation: 'Circular Economy Action Plan',
			description: 'Recycling rates and disposal methods'
		}
	];

	function calculateCO2Emissions() {
		// Simple estimation: Fuel (L) * Emission Factor
		// Diesel: ~2.68 kg CO2/L, Petrol: ~2.31 kg CO2/L
		const fuel = parseFloat(co2FormData.fuelConsumed || '0');
		const vehicles = parseFloat(co2FormData.vehicleCount || '1');
		const factor = co2FormData.fuelType === 'diesel' ? 2.68 : 2.31;
		
		if (fuel > 0) {
			co2FormData.calculatedEmissions = (fuel * vehicles * factor).toFixed(2);
		}
	}

	async function handleFileUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files) {
			for (const file of target.files) {
				// Simulate file hashing
				const arrayBuffer = await file.arrayBuffer();
				const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
				const hashArray = Array.from(new Uint8Array(hashBuffer));
				const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
				
				uploadedFiles = [...uploadedFiles, {
					name: file.name,
					size: file.size,
					hash
				}];
			}
		}
	}

	async function submitCompliance() {
		isSubmitting = true;
		
		try {
			// 1. Prepare Block Data based on type
			let blockData: any = {
				company: 'Zara Inc.', // Hardcoded for demo
				location: { name: 'Global HQ' },
				documents: uploadedFiles.map(f => ({
					type: 'COMPLIANCE_DOCUMENT',
					documentHash: f.hash,
					documentId: f.name
				}))
			};

			if (selectedComplianceType === 'co2') {
				blockData = {
					...blockData,
					step: 'CO₂ Emissions Compliance Report',
					product: { name: 'Compliance Data', quantity: 1, batchId: `COMPLIANCE-CO2-${Date.now()}` },
					metadata: { complianceType: 'co2', submittedAt: new Date().toISOString(), ...co2FormData }
				};
			} else if (selectedComplianceType === 'labor') {
				blockData = {
					...blockData,
					step: 'Labor Standards Compliance Report',
					product: { name: 'Compliance Data', quantity: 1, batchId: `COMPLIANCE-LABOR-${Date.now()}` },
					metadata: { complianceType: 'labor', submittedAt: new Date().toISOString(), ...laborFormData }
				};
			} else if (selectedComplianceType === 'water') {
				blockData = {
					...blockData,
					step: 'Water Usage Compliance Report',
					product: { name: 'Compliance Data', quantity: 1, batchId: `COMPLIANCE-WATER-${Date.now()}` },
					metadata: { complianceType: 'water', submittedAt: new Date().toISOString(), ...waterFormData }
				};
			} else if (selectedComplianceType === 'energy') {
				blockData = {
					...blockData,
					step: 'Energy Consumption Compliance Report',
					product: { name: 'Compliance Data', quantity: 1, batchId: `COMPLIANCE-ENERGY-${Date.now()}` },
					metadata: { complianceType: 'energy', submittedAt: new Date().toISOString(), ...energyFormData }
				};
			} else if (selectedComplianceType === 'materials') {
				blockData = {
					...blockData,
					step: 'Material Sourcing Compliance Report',
					product: { name: 'Compliance Data', quantity: 1, batchId: `COMPLIANCE-MAT-${Date.now()}` },
					metadata: { complianceType: 'materials', submittedAt: new Date().toISOString(), ...materialsFormData }
				};
			} else if (selectedComplianceType === 'waste') {
				blockData = {
					...blockData,
					step: 'Waste Management Compliance Report',
					product: { name: 'Compliance Data', quantity: 1, batchId: `COMPLIANCE-WASTE-${Date.now()}` },
					metadata: { complianceType: 'waste', submittedAt: new Date().toISOString(), ...wasteFormData }
				};
			}

			// 2. Load Existing Chain
			const existingData = localStorage.getItem('blockchain_zara');
			let blocks = [];
			if (existingData) {
				try {
					blocks = JSON.parse(existingData);
				} catch (e) {
					console.error("Error parsing chain", e);
				}
			}

			if (blocks.length === 0) {
				await blockchain.createGenesisBlock();
				blocks = blockchain.exportChain();
			}

			// 3. Create New Block
			const lastBlock = blocks[blocks.length - 1];
			const newBlockData = {
				index: lastBlock.index + 1,
				previousHash: lastBlock.hash,
				timestamp: Date.now(),
				data: blockData
			};

			// 4. Calculate Hash
			const { calculateBlockHash } = await import('$lib/blockchain/utils/utils');
			// calculateBlockHash expects an object with index, previousHash, timestamp, data
			newBlockData.hash = await calculateBlockHash(newBlockData);

			// 5. Append & Save
			blocks.push(newBlockData);
			localStorage.setItem('blockchain_zara', JSON.stringify(blocks));

			// Success UI
			showSuccess = true;
			setTimeout(() => {
				showSuccess = false;
				goto('/government-portal?company=zara');
			}, 2000);

		} catch (error) {
			console.error('Submission failed:', error);
			alert('Failed to submit compliance data: ' + error.message);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-12">
	<div class="container mx-auto p-6 max-w-5xl">
		<!-- Header -->
		<div class="mb-8" in:fade>
			<div class="flex items-center justify-between mb-6">
				<Button variant="outline" onclick={() => goto('/')} class="gap-2">
					<ArrowLeft class="h-4 w-4" /> Back to Home
				</Button>
				<div class="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border">
					<Building2 class="h-6 w-6 text-green-700" />
					<span class="font-bold text-green-900">Zara Inc.</span>
				</div>
			</div>
			
			<h1 class="text-4xl font-extrabold tracking-tight mb-2">Business Compliance Portal</h1>
			<p class="text-lg text-muted-foreground">Add verifiable compliance data to the blockchain. Your data will be immutable and auditable by regulators.</p>
		</div>

		{#if !selectedComplianceType}
			<!-- Compliance Type Selection Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" in:fade>
				{#each complianceTypes as type}
					<Card 
						class="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-{type.color}-500 group"
						onclick={() => selectedComplianceType = type.id}
					>
						<CardHeader>
							<div class="flex items-center gap-4 mb-2">
								<div class="p-3 bg-{type.color}-100 rounded-xl group-hover:scale-110 transition-transform">
									<svelte:component this={type.icon} class="h-6 w-6 text-{type.color}-700" />
								</div>
								<div>
									<CardTitle>{type.name}</CardTitle>
									<CardDescription class="text-xs font-medium text-{type.color}-600 mt-1">
										{type.regulation}
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<p class="text-sm text-muted-foreground">{type.description}</p>
							<Button variant="ghost" class="w-full mt-4 group-hover:bg-{type.color}-50 text-{type.color}-700">
								Add Data <Plus class="h-4 w-4 ml-2" />
							</Button>
						</CardContent>
					</Card>
				{/each}
			</div>
		{:else}
			<!-- Detail Form -->
			<div in:slide={{ duration: 300 }}>
				<Button variant="ghost" onclick={() => selectedComplianceType = null} class="mb-4 gap-2">
					<ArrowLeft class="h-4 w-4" /> Back to Types
				</Button>

				<Card class="border-t-4 border-t-green-500 shadow-lg">
					<CardHeader>
						<CardTitle class="flex items-center gap-3 text-2xl">
							{#if selectedComplianceType === 'co2'}
								<Leaf class="h-8 w-8 text-green-600" /> CO₂ Emissions Data
							{:else if selectedComplianceType === 'labor'}
								<Users class="h-8 w-8 text-blue-600" /> Labor Standards Report
							{:else if selectedComplianceType === 'water'}
								<Droplet class="h-8 w-8 text-cyan-600" /> Water Usage Report
							{:else if selectedComplianceType === 'energy'}
								<Zap class="h-8 w-8 text-yellow-600" /> Energy Consumption
							{:else if selectedComplianceType === 'materials'}
								<Factory class="h-8 w-8 text-purple-600" /> Material Sourcing
							{:else if selectedComplianceType === 'waste'}
								<Recycle class="h-8 w-8 text-orange-600" /> Waste Management
							{/if}
						</CardTitle>
						<CardDescription>
							Complete the form below to submit a new block to the compliance chain.
						</CardDescription>
					</CardHeader>

					<CardContent class="space-y-6">
						{#if selectedComplianceType === 'co2'}
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="space-y-2">
									<Label>Transport Method</Label>
									<select bind:value={co2FormData.transportMethod} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
										<option value="">Select Method</option>
										<option value="truck">Truck</option>
										<option value="ship">Ship</option>
										<option value="plane">Airplane</option>
										<option value="train">Train</option>
									</select>
								</div>
								<div class="space-y-2">
									<Label>Fuel Type</Label>
									<select bind:value={co2FormData.fuelType} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
										<option value="">Select Fuel</option>
										<option value="diesel">Diesel</option>
										<option value="petrol">Petrol</option>
										<option value="electric">Electric</option>
									</select>
								</div>
								<div class="space-y-2">
									<Label>Fuel Consumed (L)</Label>
									<Input type="number" bind:value={co2FormData.fuelConsumed} oninput={calculateCO2Emissions} />
								</div>
								<div class="space-y-2">
									<Label>Calculated Emissions (kg CO₂)</Label>
									<Input readonly value={co2FormData.calculatedEmissions} class="bg-muted" />
								</div>
								<div class="space-y-2">
									<Label>Distance (km)</Label>
									<Input type="number" bind:value={co2FormData.distance} />
								</div>
							</div>
						{/if}

						{#if selectedComplianceType === 'labor'}
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="space-y-2">
									<Label>Facility Name</Label>
									<Input bind:value={laborFormData.facility} />
								</div>
								<div class="space-y-2">
									<Label>Child Labor Verification</Label>
									<select bind:value={laborFormData.childLaborCheck} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
										<option value="no">Verified: No Child Labor</option>
										<option value="pending">Pending Verification</option>
									</select>
								</div>
								<div class="space-y-2">
									<Label>Minimum Wage ($/hr)</Label>
									<Input type="number" bind:value={laborFormData.minimumWage} />
								</div>
								<div class="space-y-2">
									<Label>Safety Incidents (Last 30d)</Label>
									<Input type="number" bind:value={laborFormData.safetyIncidents} />
								</div>
							</div>
						{/if}

						{#if selectedComplianceType === 'water'}
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="space-y-2">
									<Label>Water Source</Label>
									<select bind:value={waterFormData.waterSource} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
										<option value="">Select Source</option>
										<option value="municipal">Municipal</option>
										<option value="groundwater">Groundwater</option>
										<option value="recycled">Recycled</option>
									</select>
								</div>
								<div class="space-y-2">
									<Label>Volume Used (m³)</Label>
									<Input type="number" bind:value={waterFormData.volumeUsed} />
								</div>
							</div>
						{/if}

						{#if selectedComplianceType === 'energy'}
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="space-y-2">
									<Label>Energy Source</Label>
									<select bind:value={energyFormData.energySource} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
										<option value="">Select Source</option>
										<option value="grid">Grid</option>
										<option value="solar">Solar</option>
										<option value="wind">Wind</option>
									</select>
								</div>
								<div class="space-y-2">
									<Label>Total Consumption (kWh)</Label>
									<Input type="number" bind:value={energyFormData.totalConsumption} />
								</div>
							</div>
						{/if}

						{#if selectedComplianceType === 'materials'}
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="space-y-2">
									<Label>Material Type</Label>
									<select bind:value={materialsFormData.materialType} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
										<option value="">Select Material</option>
										<option value="cotton">Cotton</option>
										<option value="polyester">Polyester</option>
										<option value="wool">Wool</option>
									</select>
								</div>
								<div class="space-y-2">
									<Label>Supplier</Label>
									<Input bind:value={materialsFormData.supplier} />
								</div>
								<div class="space-y-2">
									<Label>Certification</Label>
									<select bind:value={materialsFormData.certification} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
										<option value="">Select Cert</option>
										<option value="organic">Organic</option>
										<option value="recycled">Recycled Standard</option>
										<option value="none">None</option>
									</select>
								</div>
							</div>
						{/if}

						{#if selectedComplianceType === 'waste'}
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="space-y-2">
									<Label>Waste Type</Label>
									<select bind:value={wasteFormData.wasteType} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
										<option value="">Select Type</option>
										<option value="textile">Textile</option>
										<option value="water">Chemical/Water</option>
										<option value="packaging">Packaging</option>
									</select>
								</div>
								<div class="space-y-2">
									<Label>Amount (kg)</Label>
									<Input type="number" bind:value={wasteFormData.totalWaste} />
								</div>
							</div>
						{/if}

						<!-- Document Upload Section (Common) -->
						<div class="space-y-4 pt-4 border-t">
							<Label class="text-lg font-semibold">Supporting Documents</Label>
							<div class="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
								<Upload class="h-8 w-8 mx-auto text-muted-foreground mb-2" />
								<p class="text-sm text-muted-foreground mb-2">Upload certificates, invoices, or audit reports (PDF, JPG)</p>
								<Input type="file" class="max-w-xs mx-auto" onchange={handleFileUpload} />
							</div>
							{#if uploadedFiles.length > 0}
								<div class="bg-muted p-4 rounded-md">
									<p class="font-medium text-sm mb-2">Attached Files:</p>
									{#each uploadedFiles as file}
										<div class="flex items-center gap-2 text-sm text-green-700">
											<File class="h-4 w-4" /> {file.name} 
											<Badge variant="outline" class="text-xs bg-green-50">Hash: {file.hash.substring(0,8)}...</Badge>
										</div>
									{/each}
								</div>
							{/if}
						</div>

						<!-- Action Buttons -->
						<div class="flex justify-end gap-3 pt-4">
							<Button variant="outline" onclick={() => selectedComplianceType = null}>Cancel</Button>
							<Button onclick={submitCompliance} disabled={isSubmitting} class="bg-green-600 hover:bg-green-700 text-white min-w-[150px]">
								{#if isSubmitting}
									Processing...
								{:else}
									Submit to Blockchain
								{/if}
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		{/if}
	</div>
</div>

{#if showSuccess}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" transition:fade>
		<Card class="w-96 border-green-500 border-2">
			<CardContent class="pt-6 text-center">
				<div class="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<CheckCircle2 class="h-10 w-10 text-green-600" />
				</div>
				<h3 class="text-xl font-bold text-green-900 mb-2">Compliance Verified!</h3>
				<p class="text-muted-foreground mb-4">Block #{new Date().getTime().toString().slice(-4)} mined and added to the chain.</p>
				<p class="text-xs text-muted-foreground">Redirecting to Audit Portal...</p>
			</CardContent>
		</Card>
	</div>
{/if}