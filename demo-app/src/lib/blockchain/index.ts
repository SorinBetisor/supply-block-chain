/**
 * Blockchain Module - Supply Chain Verification
 * 
 * This module provides a complete blockchain implementation for supply chain tracking.
 * It demonstrates:
 * - Block creation and chaining
 * - Hash-based integrity verification
 * - Tamper detection
 * - Supply chain data tracking
 */

// Core classes
export { Blockchain } from './blockchain.js';
export { BlockClass } from './block.js';

// Types
export type {
	Block,
	SupplyChainData,
	ValidationResult,
	TamperResult
} from './types.js';

// Utilities
export {
	calculateHash,
	calculateBlockHash,
	serializeBlockData,
	isValidHash,
	formatTimestamp
} from './utils.js';

// Supply chain data
export {
	ZARA_SWEATSHIRT_STEPS,
	createSupplyChainData
} from './supplyChain.js';

