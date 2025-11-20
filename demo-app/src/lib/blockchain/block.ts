import type { Block, SupplyChainData } from './types.js';
import { calculateBlockHash, isValidHash } from './utils.js';

/**
 * Block Class
 * Represents a single block in the blockchain
 */
export class BlockClass {
	public index: number;
	public previousHash: string;
	public timestamp: number;
	public data: SupplyChainData;
	public hash: string;
	public nonce: number;

	constructor(
		index: number,
		previousHash: string,
		data: SupplyChainData,
		timestamp?: number,
		nonce: number = 0
	) {
		this.index = index;
		this.previousHash = previousHash;
		this.timestamp = timestamp || Date.now();
		this.data = data;
		this.nonce = nonce;
		this.hash = ''; // Will be calculated
	}

	/**
	 * Calculate and set the hash for this block
	 */
	async calculateHash(): Promise<string> {
		const hash = await calculateBlockHash({
			index: this.index,
			previousHash: this.previousHash,
			timestamp: this.timestamp,
			data: this.data,
			nonce: this.nonce
		});
		this.hash = hash;
		return hash;
	}

	/**
	 * Validate the block structure
	 */
	validate(): { isValid: boolean; reason?: string } {
		if (this.index < 0) {
			return { isValid: false, reason: 'Index must be non-negative' };
		}

		if (!isValidHash(this.hash)) {
			return { isValid: false, reason: 'Invalid hash format' };
		}

		if (this.index === 0 && this.previousHash !== '0') {
			return { isValid: false, reason: 'Genesis block must have previousHash of "0"' };
		}

		if (this.index > 0 && !isValidHash(this.previousHash)) {
			return { isValid: false, reason: 'Invalid previousHash format' };
		}

		return { isValid: true };
	}

	/**
	 * Convert block to plain object
	 */
	toJSON(): Block {
		return {
			index: this.index,
			previousHash: this.previousHash,
			timestamp: this.timestamp,
			data: this.data,
			hash: this.hash,
			nonce: this.nonce
		};
	}

	/**
	 * Create block from plain object
	 */
	static fromJSON(blockData: Block): BlockClass {
		const block = new BlockClass(
			blockData.index,
			blockData.previousHash,
			blockData.data,
			blockData.timestamp,
			blockData.nonce
		);
		block.hash = blockData.hash;
		return block;
	}
}

