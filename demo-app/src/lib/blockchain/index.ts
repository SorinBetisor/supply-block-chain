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
export { Blockchain } from './classes/blockchain.ts';
export { BlockClass } from './classes/block.ts';

// Types
export type {
	Block,
	SupplyChainStepData,
	SupplyChain, // Represents the complete supply chain (type alias for Block[])
	ValidationResult,
	TamperResult
} from './types/types.ts';

// Utilities
export {
	calculateHash,
	calculateBlockHash,
	calculateFileHash,
	serializeBlockData,
	isValidHash,
	formatTimestamp
} from './utils/utils.ts';

// Supply chain data
export {
	ZARA_SWEATSHIRT_STEPS,
	createSupplyChainData
} from './demo_zara.ts';

