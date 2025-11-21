/**
 * Employee Role
 * Defines the different roles in the Zara supply chain
 */
export type EmployeeRole = 
	| 'farm_manager'
	| 'textile_manager'
	| 'manufacturing_manager'
	| 'qa_inspector'
	| 'distribution_manager'
	| 'retail_manager'
	| 'logistics_coordinator'
	| 'admin';

/**
 * Employee
 * Represents a Zara employee who can add blocks to the supply chain
 */
export interface Employee {
	id: string;
	name: string;
	email: string;
	role: EmployeeRole;
	department: string;
	location: string;
}

/**
 * Added By Metadata
 * Tracks who added a block to the blockchain
 */
export interface AddedByMetadata {
	employeeId: string;
	employeeName: string;
	employeeRole: EmployeeRole;
	timestamp: number; // When the employee added this block
}

/**
 * Supply Chain Step Data
 * Represents the data for a single step in the supply chain
 * Each step tracks information about the product's journey through the supply chain
 */
export interface SupplyChainStepData {
	// Basic Information
	step: string; // e.g., "Cotton Farm", "Textile Factory", "Manufacturing"
	company: string; // Company/entity name
	location: {
		name: string; // Location name
		coordinates?: {
			lat: number;
			lng: number;
		};
	};

	// Product Details
	product: {
		name: string; // e.g., "Zara Sweatshirt"
		quantity: number;
		batchId: string;
		description?: string;
	};

	// Transport Information (optional, for transport steps)
	transport?: {
		vehicleId?: string;
		route?: string;
		carrier?: string;
	};

	// Certifications (optional)
	certifications?: Array<{
		type: 'BIO' | 'ORGANIC' | 'CO2_NEUTRAL' | 'FAIR_TRADE' | string;
		issuer: string;
		certificateId: string;
		validUntil?: string; // ISO date string
	}>;

	// Documents (stored as metadata/hashes)
	documents?: Array<{
		type: 'INVOICE' | 'CERTIFICATE' | 'QUALITY_REPORT' | 'SHIPPING_MANIFEST' | string;
		documentHash: string; // SHA256 hash of the document
		documentId: string;
		url?: string; // Optional reference URL
	}>;

	// Employee who added this block (for audit trail)
	addedBy?: AddedByMetadata;

	// Additional metadata
	metadata?: Record<string, unknown>;
}

/**
 * Block
 * Represents a single step in the supply chain, stored as a block in the blockchain.
 * Each Block contains one supply chain step's data and links to the previous step.
 * 
 * Blocks build up to form a Blockchain, which represents the complete supply chain.
 */
export interface Block {
	index: number; // Position in the chain (0 = genesis block)
	previousHash: string; // Hash of the previous block (links blocks together)
	timestamp: number; // When this step occurred
	data: SupplyChainStepData; // The supply chain step data
	hash: string; // Cryptographic hash of this block
	nonce: number; // Random number used in hash calculation
}

/**
 * Blockchain
 * Represents the complete supply chain as a chain of blocks.
 */
export type Blockchain = Block[];

/**
 * Supply Chain
 * Alias for Blockchain - makes it explicit that the blockchain represents a supply chain.
 * The supply chain is the complete journey of a product from origin to destination,
 * with each step recorded as a Block in the chain.
 */
export type SupplyChain = Blockchain;

/**
 * Blockchain Validation Result
 */
export interface ValidationResult {
	isValid: boolean;
	invalidBlocks?: Array<{
		index: number;
		reason: string;
	}>;
}

/**
 * Tamper Detection Result
 */
export interface TamperResult {
	isTampered: boolean;
	tamperedBlocks: Array<{
		index: number;
		reason: string;
		expectedHash: string;
		actualHash: string;
	}>;
}

