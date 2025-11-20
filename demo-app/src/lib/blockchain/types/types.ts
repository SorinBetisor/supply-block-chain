/**
 * Block Data Structure
 * Represents all the information stored in a block for supply chain tracking
 */
export interface BlockData {
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

	// Additional metadata
	metadata?: Record<string, unknown>;
}

/**
 * Block Structure
 * Represents a single block in the blockchain
 */
export interface Block {
	index: number;
	previousHash: string;
	timestamp: number;
	data: BlockData;
	hash: string;
	nonce: number; // For simplicity, we'll use 0 (no PoW)
}

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

