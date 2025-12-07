<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
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
		Recycle,
		ChevronDown
	} from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Select Options Data
	const transportMethods = [
		{ value: 'truck', label: 'Truck' },
		{ value: 'ship', label: 'Ship' },
		{ value: 'plane', label: 'Airplane' },
		{ value: 'train', label: 'Train' }
	];

	const fuelTypes = [
		{ value: 'diesel', label: 'Diesel' },
		{ value: 'petrol', label: 'Petrol/Gasoline' },
		{ value: 'electric', label: 'Electric' },
		{ value: 'biodiesel', label: 'Biodiesel' },
		{ value: 'lng', label: 'LNG (Liquefied Natural Gas)' }
	];

	const childLaborVerification = [
		{ value: 'no', label: 'No child labor - All employees 18+' },
		{ value: 'pending', label: 'Pending verification' }
	];

	const waterSources = [
		{ value: 'municipal', label: 'Municipal Supply' },
		{ value: 'groundwater', label: 'Groundwater' },
		{ value: 'surface', label: 'Surface Water' },
		{ value: 'recycled', label: 'Recycled Water' }
	];

	const energySources = [
		{ value: 'grid', label: 'Grid (Mixed)' },
		{ value: 'solar', label: 'Solar' },
		{ value: 'wind', label: 'Wind' },
		{ value: 'hydro', label: 'Hydroelectric' },
		{ value: 'natural-gas', label: 'Natural Gas' },
		{ value: 'mixed-renewable', label: 'Mixed Renewable' }
	];

	const materialTypes = [
		{ value: 'cotton', label: 'Cotton' },
		{ value: 'wool', label: 'Wool' },
		{ value: 'leather', label: 'Leather' },
		{ value: 'synthetic', label: 'Synthetic Fabric' },
		{ value: 'recycled', label: 'Recycled Materials' },
		{ value: 'other', label: 'Other' }
	];

	const certificationTypes = [
		{ value: 'organic', label: 'Organic Certified' },
		{ value: 'fairtrade', label: 'Fair Trade' },
		{ value: 'gots', label: 'GOTS (Global Organic Textile)' },
		{ value: 'oeko-tex', label: 'OEKO-TEX' },
		{ value: 'fsc', label: 'FSC Certified' },
		{ value: 'none', label: 'No Certification' }
	];

	const wasteTypes = [
		{ value: 'textile', label: 'Textile Waste' },
		{ value: 'packaging', label: 'Packaging' },
		{ value: 'plastic', label: 'Plastic' },
		{ value: 'paper', label: 'Paper/Cardboard' },
		{ value: 'mixed', label: 'Mixed Waste' },
		{ value: 'hazardous', label: 'Hazardous Waste' }
	];

	let selectedComplianceType = $state<string | null>(null);
