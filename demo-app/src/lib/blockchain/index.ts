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
	BlockData,
	ValidationResult,
	TamperResult
} from './types/types.js';

// Utilities
export {
	calculateHash,
	calculateBlockHash,
	serializeBlockData,
	isValidHash,
	formatTimestamp
} from './utils/utils.js';

// Supply chain data
export {
	ZARA_SWEATSHIRT_STEPS,
	createSupplyChainData
} from './supplyChain.js';

