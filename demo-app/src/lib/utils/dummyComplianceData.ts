import type { Block } from '$lib/blockchain/types/types';
import { calculateBlockHash } from '$lib/blockchain/utils/utils';

// Generate dummy compliance data for demo purposes
export async function initializeDummyDataForZara() {
	// Check if dummy data was already initialized
	const dummyInitialized = localStorage.getItem('blockchain_zara_dummy_initialized');
	if (dummyInitialized === 'true') {
		return; // Dummy data already added, don't re-initialize
	}

	// Load any existing user-submitted data
	const existingData = localStorage.getItem('blockchain_zara');
	let existingBlocks: Block[] = [];
	
	if (existingData) {
		try {
			existingBlocks = JSON.parse(existingData);
		} catch (error) {
			console.error('Failed to parse existing blockchain:', error);
		}
	}

	const now = Date.now();
	const dummyBlocks: Block[] = [];

	// Genesis block
	dummyBlocks.push({
		index: 0,
		previousHash: '0',
		timestamp: now - 30 * 24 * 60 * 60 * 1000,
		hash: '0000000000000000000000000000000000000000000000000000000000000000',
		data: {
			step: 'Supply Chain Origin',
			company: 'Blockchain Verification System',
			location: { name: 'Global' },
			product: {
				name: 'Supply Chain Tracking',
				quantity: 1,
				batchId: 'GENESIS-001'
			}
		}
	});

	// CO2 Submissions (4 blocks)
	dummyBlocks.push({
		index: 1,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 25 * 24 * 60 * 60 * 1000,
		hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
		data: {
			step: 'CO₂ Emissions Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'Texas, USA' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-CO2-001',
				description: 'Transport emissions Texas to North Carolina'
			},
			documents: [
				{ type: 'COMPLIANCE_DOCUMENT', documentHash: 'hash-co2-1', documentId: 'DOC-CO2-001' }
			],
			metadata: {
				complianceType: 'co2',
				submittedAt: new Date(now - 25 * 24 * 60 * 60 * 1000).toISOString(),
				transportMethod: 'truck',
				vehicleCount: '3',
				fromLocation: 'Texas, USA',
				toLocation: 'North Carolina, USA',
				distance: '2400',
				fuelConsumed: '400',
				calculatedEmissions: '2772',
				date: '2024-11-10'
			}
		}
	});

	dummyBlocks.push({
		index: 2,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 18 * 24 * 60 * 60 * 1000,
		hash: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3',
		data: {
			step: 'CO₂ Emissions Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'North Carolina, USA' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-CO2-002'
			},
			documents: [
				{ type: 'COMPLIANCE_DOCUMENT', documentHash: 'hash-co2-2', documentId: 'DOC-CO2-002' }
			],
			metadata: {
				complianceType: 'co2',
				submittedAt: new Date(now - 18 * 24 * 60 * 60 * 1000).toISOString(),
				transportMethod: 'truck',
				vehicleCount: '2',
				fromLocation: 'North Carolina, USA',
				toLocation: 'Georgia, USA',
				distance: '650',
				fuelConsumed: '280',
				calculatedEmissions: '1294',
				date: '2024-11-17'
			}
		}
	});

	dummyBlocks.push({
		index: 3,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 10 * 24 * 60 * 60 * 1000,
		hash: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4',
		data: {
			step: 'CO₂ Emissions Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'Georgia, USA' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-CO2-003'
			},
			metadata: {
				complianceType: 'co2',
				submittedAt: new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString(),
				transportMethod: 'ship',
				vehicleCount: '1',
				fromLocation: 'Georgia, USA',
				toLocation: 'Portugal',
				distance: '7800',
				fuelConsumed: '12000',
				calculatedEmissions: '27720',
				date: '2024-11-25'
			}
		}
	});

	dummyBlocks.push({
		index: 4,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 3 * 24 * 60 * 60 * 1000,
		hash: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5',
		data: {
			step: 'CO₂ Emissions Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'Portugal' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-CO2-004'
			},
			documents: [
				{ type: 'COMPLIANCE_DOCUMENT', documentHash: 'hash-co2-4', documentId: 'DOC-CO2-004' }
			],
			metadata: {
				complianceType: 'co2',
				submittedAt: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
				transportMethod: 'truck',
				vehicleCount: '4',
				fromLocation: 'Portugal',
				toLocation: 'Spain',
				distance: '620',
				fuelConsumed: '320',
				calculatedEmissions: '2956',
				date: '2024-12-02'
			}
		}
	});

	// Labor Submissions (2 blocks)
	dummyBlocks.push({
		index: 5,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 15 * 24 * 60 * 60 * 1000,
		hash: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6',
		data: {
			step: 'Labor Standards Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'Portugal' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-LABOR-001'
			},
			documents: [
				{ type: 'COMPLIANCE_DOCUMENT', documentHash: 'hash-labor-1', documentId: 'DOC-LABOR-001' }
			],
			metadata: {
				complianceType: 'labor',
				submittedAt: new Date(now - 15 * 24 * 60 * 60 * 1000).toISOString(),
				facility: 'Zara Manufacturing Facility',
				location: 'Portugal',
				employeeCount: '250',
				minimumWage: '8.50',
				averageWage: '12.00',
				childLaborCheck: 'no',
				safetyIncidents: '0'
			}
		}
	});

	dummyBlocks.push({
		index: 6,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 5 * 24 * 60 * 60 * 1000,
		hash: 'f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7',
		data: {
			step: 'Labor Standards Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'Spain' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-LABOR-002'
			},
			documents: [
				{ type: 'COMPLIANCE_DOCUMENT', documentHash: 'hash-labor-2', documentId: 'DOC-LABOR-002' }
			],
			metadata: {
				complianceType: 'labor',
				submittedAt: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
				facility: 'Zara Distribution Hub',
				location: 'Madrid, Spain',
				employeeCount: '180',
				minimumWage: '9.00',
				averageWage: '13.50',
				childLaborCheck: 'no',
				safetyIncidents: '1'
			}
		}
	});

	// Water Submission (1 block)
	dummyBlocks.push({
		index: 7,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 8 * 24 * 60 * 60 * 1000,
		hash: 'g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8',
		data: {
			step: 'Water Usage Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'Portugal' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-WATER-001'
			},
			documents: [
				{ type: 'COMPLIANCE_DOCUMENT', documentHash: 'hash-water-1', documentId: 'DOC-WATER-001' }
			],
			metadata: {
				complianceType: 'water',
				submittedAt: new Date(now - 8 * 24 * 60 * 60 * 1000).toISOString(),
				facility: 'Textile Processing Plant',
				volumeUsed: '15000',
				wastewaterTreated: '14000',
				period: 'Q4 2024'
			}
		}
	});

	// Energy Submission (1 block)
	dummyBlocks.push({
		index: 8,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 12 * 24 * 60 * 60 * 1000,
		hash: 'h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9',
		data: {
			step: 'Energy Consumption Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'Spain' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-ENERGY-001'
			},
			metadata: {
				complianceType: 'energy',
				submittedAt: new Date(now - 12 * 24 * 60 * 60 * 1000).toISOString(),
				facility: 'Manufacturing Plant',
				totalConsumption: '250000',
				renewablePercentage: '65',
				energySource: 'mixed-renewable',
				period: 'Q4 2024'
			}
		}
	});

	// Materials Submissions (2 blocks)
	dummyBlocks.push({
		index: 9,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 20 * 24 * 60 * 60 * 1000,
		hash: 'i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0',
		data: {
			step: 'Material Sourcing Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'India' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-MATERIALS-001'
			},
			documents: [
				{ type: 'COMPLIANCE_DOCUMENT', documentHash: 'hash-materials-1', documentId: 'DOC-MATERIALS-001' }
			],
			metadata: {
				complianceType: 'materials',
				submittedAt: new Date(now - 20 * 24 * 60 * 60 * 1000).toISOString(),
				materialType: 'cotton',
				supplier: 'Organic Cotton Suppliers Ltd',
				origin: 'Punjab, India',
				quantity: '8500',
				certification: 'gots',
				sustainabilityScore: '92',
				traceabilityDoc: 'TRACE-2024-IND-001'
			}
		}
	});

	dummyBlocks.push({
		index: 10,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 6 * 24 * 60 * 60 * 1000,
		hash: 'j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1',
		data: {
			step: 'Material Sourcing Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'Portugal' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-MATERIALS-002'
			},
			documents: [
				{ type: 'COMPLIANCE_DOCUMENT', documentHash: 'hash-materials-2', documentId: 'DOC-MATERIALS-002' }
			],
			metadata: {
				complianceType: 'materials',
				submittedAt: new Date(now - 6 * 24 * 60 * 60 * 1000).toISOString(),
				materialType: 'recycled',
				supplier: 'EcoTextile Solutions',
				origin: 'Porto, Portugal',
				quantity: '3200',
				certification: 'oeko-tex',
				sustainabilityScore: '88',
				traceabilityDoc: 'TRACE-2024-POR-001'
			}
		}
	});

	// Waste Submissions (3 blocks)
	dummyBlocks.push({
		index: 11,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 22 * 24 * 60 * 60 * 1000,
		hash: 'k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2',
		data: {
			step: 'Waste Management Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'Spain' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-WASTE-001'
			},
			documents: [
				{ type: 'COMPLIANCE_DOCUMENT', documentHash: 'hash-waste-1', documentId: 'DOC-WASTE-001' }
			],
			metadata: {
				complianceType: 'waste',
				submittedAt: new Date(now - 22 * 24 * 60 * 60 * 1000).toISOString(),
				facility: 'Madrid Distribution Center',
				location: 'Madrid, Spain',
				totalWaste: '12500',
				recycledPercentage: '78',
				wasteType: 'textile',
				disposalMethod: 'recycling',
				period: 'Q3 2024'
			}
		}
	});

	dummyBlocks.push({
		index: 12,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 14 * 24 * 60 * 60 * 1000,
		hash: 'l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3',
		data: {
			step: 'Waste Management Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'Portugal' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-WASTE-002'
			},
			metadata: {
				complianceType: 'waste',
				submittedAt: new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString(),
				facility: 'Porto Manufacturing Plant',
				location: 'Porto, Portugal',
				totalWaste: '8900',
				recycledPercentage: '82',
				wasteType: 'mixed',
				disposalMethod: 'recycling',
				period: 'Q3 2024'
			}
		}
	});

	dummyBlocks.push({
		index: 13,
		previousHash: dummyBlocks[dummyBlocks.length - 1].hash,
		timestamp: now - 4 * 24 * 60 * 60 * 1000,
		hash: 'm3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4',
		data: {
			step: 'Waste Management Compliance Report',
			company: 'Zara Inc.',
			location: { name: 'USA' },
			product: {
				name: 'Compliance Data',
				quantity: 1,
				batchId: 'COMPLIANCE-WASTE-003'
			},
			documents: [
				{ type: 'COMPLIANCE_DOCUMENT', documentHash: 'hash-waste-3', documentId: 'DOC-WASTE-003' }
			],
			metadata: {
				complianceType: 'waste',
				submittedAt: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString(),
				facility: 'Texas Warehouse',
				location: 'Texas, USA',
				totalWaste: '6200',
				recycledPercentage: '85',
				wasteType: 'packaging',
				disposalMethod: 'recycling',
				period: 'Q4 2024'
			}
		}
	});

	// Merge dummy blocks with any existing user-submitted blocks (excluding genesis)
	// We identify user blocks as those that are not the genesis block (index > 0)
	// Since business portal initializes with just genesis if empty, existingBlocks might be [Genesis, UserBlock1, ...]
	
	const finalBlocks = [...dummyBlocks];
	
	if (existingBlocks.length > 0) {
		// Filter out genesis block from existing data
		const userBlocks = existingBlocks.filter(b => b.index > 0);
		
		// Append user blocks to dummy chain, recalculating hashes to maintain validity
		for (const userBlock of userBlocks) {
			const lastBlock = finalBlocks[finalBlocks.length - 1];
			const newIndex = finalBlocks.length;
			const newPreviousHash = lastBlock.hash;
			
			// Create new block object for hashing (excluding hash itself)
			const blockDataForHash = {
				index: newIndex,
				previousHash: newPreviousHash,
				timestamp: userBlock.timestamp, // Keep original timestamp
				data: userBlock.data
			};
			
			// Calculate new hash
			const newHash = await calculateBlockHash(blockDataForHash);
			
			finalBlocks.push({
				...blockDataForHash,
				hash: newHash
			});
		}
	}

	// Save merged chain to localStorage
	localStorage.setItem('blockchain_zara', JSON.stringify(finalBlocks));
	localStorage.setItem('blockchain_zara_dummy_initialized', 'true');
	console.log('Initialized dummy compliance data for Zara with', finalBlocks.length, 'blocks (including merged user blocks)');
}

