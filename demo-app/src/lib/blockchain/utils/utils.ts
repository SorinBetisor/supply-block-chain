import type { Block, BlockData } from '../types/types.js';

/**
 * Calculate SHA256 hash of a string
 * For demo purposes, we'll use Web Crypto API (available in browsers)
 */
export async function calculateHash(input: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Serialize block data to string for hashing
 */
export function serializeBlockData(data: BlockData): string {
	return JSON.stringify(data, Object.keys(data).sort());
}

/**
 * Calculate block hash
 * Hash = SHA256(index + previousHash + timestamp + serializedData + nonce)
 */
export async function calculateBlockHash(block: Omit<Block, 'hash'>): Promise<string> {
	const dataString = serializeBlockData(block.data);
	const input = `${block.index}${block.previousHash}${block.timestamp}${dataString}${block.nonce}`;
	return calculateHash(input);
}

/**
 * Validate hash format (for demo, we can check if it's a valid hex string)
 */
export function isValidHash(hash: string): boolean {
	return /^[a-f0-9]{64}$/i.test(hash);
}

/**
 * Format timestamp to readable date string
 */
export function formatTimestamp(timestamp: number): string {
	return new Date(timestamp).toLocaleString();
}

