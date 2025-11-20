/**
 * Re-export types from types/types.ts
 * This file is kept for backward compatibility
 * 
 * Note: Blockchain type is not exported here to avoid conflict with Blockchain class.
 * Use SupplyChain type instead, which is an alias for Blockchain (Block[]).
 */
export type {
	Block,
	SupplyChainStepData,
	SupplyChain, // Use this instead of Blockchain type
	ValidationResult,
	TamperResult
} from './types/types.ts';

