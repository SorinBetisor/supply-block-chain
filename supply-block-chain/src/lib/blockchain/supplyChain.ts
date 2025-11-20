import type { SupplyChainData } from './types.js';

/**
 * Predefined supply chain steps for Zara Sweatshirt journey
 * These can be used to quickly populate the demo
 */
export const ZARA_SWEATSHIRT_STEPS: SupplyChainData[] = [
	{
		step: 'Cotton Farm',
		company: 'Organic Cotton Farm Co.',
		location: {
			name: 'Texas, USA',
			coordinates: { lat: 31.9686, lng: -99.9018 }
		},
		product: {
			name: 'Zara Sweatshirt',
			quantity: 1000,
			batchId: 'BATCH-2024-001',
			description: 'Organic cotton harvest'
		},
		certifications: [
			{
				type: 'ORGANIC',
				issuer: 'USDA Organic',
				certificateId: 'USDA-ORG-2024-12345',
				validUntil: '2025-12-31'
			}
		],
		documents: [
			{
				type: 'CERTIFICATE',
				documentHash: 'a1b2c3d4e5f6...', // Placeholder
				documentId: 'CERT-001'
			}
		]
	},
	{
		step: 'Cotton Processing',
		company: 'Textile Processing Inc.',
		location: {
			name: 'North Carolina, USA',
			coordinates: { lat: 35.2271, lng: -80.8431 }
		},
		product: {
			name: 'Zara Sweatshirt',
			quantity: 1000,
			batchId: 'BATCH-2024-001',
			description: 'Cotton ginning and cleaning'
		},
		transport: {
			vehicleId: 'TRUCK-789',
			route: 'Texas → North Carolina',
			carrier: 'Green Logistics LLC'
		},
		documents: [
			{
				type: 'INVOICE',
				documentHash: 'b2c3d4e5f6a1...',
				documentId: 'INV-001'
			},
			{
				type: 'SHIPPING_MANIFEST',
				documentHash: 'c3d4e5f6a1b2...',
				documentId: 'SHIP-001'
			}
		]
	},
	{
		step: 'Textile Manufacturing',
		company: 'Fabric Weavers Ltd.',
		location: {
			name: 'Georgia, USA',
			coordinates: { lat: 33.749, lng: -84.388 }
		},
		product: {
			name: 'Zara Sweatshirt',
			quantity: 1000,
			batchId: 'BATCH-2024-001',
			description: 'Cotton yarn spinning and fabric weaving'
		},
		transport: {
			vehicleId: 'TRUCK-790',
			route: 'North Carolina → Georgia',
			carrier: 'Green Logistics LLC'
		},
		certifications: [
			{
				type: 'CO2_NEUTRAL',
				issuer: 'Carbon Trust',
				certificateId: 'CT-CO2-2024-67890',
				validUntil: '2025-06-30'
			}
		],
		documents: [
			{
				type: 'INVOICE',
				documentHash: 'd4e5f6a1b2c3...',
				documentId: 'INV-002'
			},
			{
				type: 'QUALITY_REPORT',
				documentHash: 'e5f6a1b2c3d4...',
				documentId: 'QUAL-001'
			}
		]
	},
	{
		step: 'Garment Manufacturing',
		company: 'Zara Manufacturing Facility',
		location: {
			name: 'Portugal',
			coordinates: { lat: 38.7223, lng: -9.1393 }
		},
		product: {
			name: 'Zara Sweatshirt',
			quantity: 1000,
			batchId: 'BATCH-2024-001',
			description: 'Cutting, sewing, and assembly'
		},
		transport: {
			vehicleId: 'SHIP-ATLANTIC-001',
			route: 'Georgia → Portugal (via Atlantic)',
			carrier: 'Ocean Freight International'
		},
		documents: [
			{
				type: 'INVOICE',
				documentHash: 'f6a1b2c3d4e5...',
				documentId: 'INV-003'
			},
			{
				type: 'SHIPPING_MANIFEST',
				documentHash: 'a1b2c3d4e5f6...',
				documentId: 'SHIP-002'
			}
		]
	},
	{
		step: 'Quality Control',
		company: 'Zara Quality Assurance',
		location: {
			name: 'Portugal',
			coordinates: { lat: 38.7223, lng: -9.1393 }
		},
		product: {
			name: 'Zara Sweatshirt',
			quantity: 1000,
			batchId: 'BATCH-2024-001',
			description: 'Quality inspection and testing'
		},
		documents: [
			{
				type: 'QUALITY_REPORT',
				documentHash: 'b2c3d4e5f6a1...',
				documentId: 'QUAL-002'
			}
		]
	},
	{
		step: 'Distribution Center',
		company: 'Zara Distribution Hub',
		location: {
			name: 'Madrid, Spain',
			coordinates: { lat: 40.4168, lng: -3.7038 }
		},
		product: {
			name: 'Zara Sweatshirt',
			quantity: 1000,
			batchId: 'BATCH-2024-001',
			description: 'Warehousing and distribution preparation'
		},
		transport: {
			vehicleId: 'TRUCK-ESP-456',
			route: 'Portugal → Madrid',
			carrier: 'Iberian Logistics'
		},
		documents: [
			{
				type: 'SHIPPING_MANIFEST',
				documentHash: 'c3d4e5f6a1b2...',
				documentId: 'SHIP-003'
			}
		]
	},
	{
		step: 'Retail Store',
		company: 'Zara Store',
		location: {
			name: 'Barcelona, Spain',
			coordinates: { lat: 41.3851, lng: 2.1734 }
		},
		product: {
			name: 'Zara Sweatshirt',
			quantity: 1000,
			batchId: 'BATCH-2024-001',
			description: 'Final retail destination'
		},
		transport: {
			vehicleId: 'TRUCK-ESP-457',
			route: 'Madrid → Barcelona',
			carrier: 'Iberian Logistics'
		},
		documents: [
			{
				type: 'INVOICE',
				documentHash: 'd4e5f6a1b2c3...',
				documentId: 'INV-004'
			}
		]
	}
];

/**
 * Helper function to create custom supply chain data
 */
export function createSupplyChainData(
	step: string,
	company: string,
	location: string,
	productName: string,
	quantity: number,
	batchId: string,
	options?: {
		coordinates?: { lat: number; lng: number };
		transport?: SupplyChainData['transport'];
		certifications?: SupplyChainData['certifications'];
		documents?: SupplyChainData['documents'];
		description?: string;
	}
): SupplyChainData {
	return {
		step,
		company,
		location: {
			name: location,
			coordinates: options?.coordinates
		},
		product: {
			name: productName,
			quantity,
			batchId,
			description: options?.description
		},
		transport: options?.transport,
		certifications: options?.certifications,
		documents: options?.documents
	};
}

