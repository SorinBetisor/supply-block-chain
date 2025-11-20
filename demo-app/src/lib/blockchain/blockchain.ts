import type { Block, SupplyChainData, ValidationResult, TamperResult } from './types.js';
import { BlockClass } from './block.js';
import { calculateBlockHash } from './utils.js';

/**
 * Blockchain Class
 * Manages the chain of blocks and provides validation/tamper detection
 */
export class Blockchain {
	private chain: BlockClass[];

	constructor() {
		this.chain = [];
	}

	/**
	 * Create the genesis block
	 */
	async createGenesisBlock(data: SupplyChainData): Promise<BlockClass> {
		const genesisBlock = new BlockClass(0, '0', data);
		await genesisBlock.calculateHash();
		this.chain.push(genesisBlock);
		return genesisBlock;
	}

	/**
	 * Get the latest block in the chain
	 */
	getLatestBlock(): BlockClass | null {
		return this.chain.length > 0 ? this.chain[this.chain.length - 1] : null;
	}

	/**
	 * Add a new block to the chain
	 */
	async addBlock(data: SupplyChainData): Promise<BlockClass> {
		const latestBlock = this.getLatestBlock();

		if (!latestBlock) {
			throw new Error('Genesis block must be created first');
		}

		const newBlock = new BlockClass(
			this.chain.length,
			latestBlock.hash,
			data
		);

		await newBlock.calculateHash();
		this.chain.push(newBlock);
		return newBlock;
	}

	/**
	 * Get the entire chain
	 */
	getChain(): BlockClass[] {
		return [...this.chain];
	}

	/**
	 * Get a specific block by index
	 */
	getBlock(index: number): BlockClass | null {
		return this.chain[index] || null;
	}

	/**
	 * Validate the entire blockchain
	 * Checks:
	 * 1. Each block's structure is valid
	 * 2. Each block's hash is correct
	 * 3. Each block's previousHash matches the previous block's hash
	 */
	async validateChain(): Promise<ValidationResult> {
		const invalidBlocks: Array<{ index: number; reason: string }> = [];

		// Check genesis block
		if (this.chain.length === 0) {
			return { isValid: false, invalidBlocks: [{ index: -1, reason: 'Chain is empty' }] };
		}

		const genesisBlock = this.chain[0];
		const genesisValidation = genesisBlock.validate();
		if (!genesisValidation.isValid) {
			invalidBlocks.push({ index: 0, reason: genesisValidation.reason || 'Invalid genesis block' });
		}

		// Validate hash of genesis block
		const genesisHash = await calculateBlockHash({
			index: genesisBlock.index,
			previousHash: genesisBlock.previousHash,
			timestamp: genesisBlock.timestamp,
			data: genesisBlock.data,
			nonce: genesisBlock.nonce
		});

		if (genesisHash !== genesisBlock.hash) {
			invalidBlocks.push({
				index: 0,
				reason: `Genesis block hash mismatch. Expected: ${genesisHash}, Got: ${genesisBlock.hash}`
			});
		}

		// Validate rest of the chain
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			// Validate block structure
			const blockValidation = currentBlock.validate();
			if (!blockValidation.isValid) {
				invalidBlocks.push({
					index: i,
					reason: blockValidation.reason || 'Invalid block structure'
				});
				continue;
			}

			// Validate previous hash link
			if (currentBlock.previousHash !== previousBlock.hash) {
				invalidBlocks.push({
					index: i,
					reason: `Previous hash mismatch. Expected: ${previousBlock.hash}, Got: ${currentBlock.previousHash}`
				});
			}

			// Validate current block hash
			const calculatedHash = await calculateBlockHash({
				index: currentBlock.index,
				previousHash: currentBlock.previousHash,
				timestamp: currentBlock.timestamp,
				data: currentBlock.data,
				nonce: currentBlock.nonce
			});

			if (calculatedHash !== currentBlock.hash) {
				invalidBlocks.push({
					index: i,
					reason: `Block hash mismatch. Expected: ${calculatedHash}, Got: ${currentBlock.hash}`
				});
			}
		}

		return {
			isValid: invalidBlocks.length === 0,
			invalidBlocks: invalidBlocks.length > 0 ? invalidBlocks : undefined
		};
	}

	/**
	 * Detect tampering in the blockchain
	 * Similar to validateChain but specifically for tamper detection
	 */
	async detectTampering(): Promise<TamperResult> {
		const tamperedBlocks: Array<{
			index: number;
			reason: string;
			expectedHash: string;
			actualHash: string;
		}> = [];

		for (let i = 0; i < this.chain.length; i++) {
			const block = this.chain[i];
			const calculatedHash = await calculateBlockHash({
				index: block.index,
				previousHash: block.previousHash,
				timestamp: block.timestamp,
				data: block.data,
				nonce: block.nonce
			});

			if (calculatedHash !== block.hash) {
				tamperedBlocks.push({
					index: i,
					reason: 'Block data has been modified',
					expectedHash: calculatedHash,
					actualHash: block.hash
				});
			}

			// Check previous hash link (except for genesis)
			if (i > 0) {
				const previousBlock = this.chain[i - 1];
				if (block.previousHash !== previousBlock.hash) {
					tamperedBlocks.push({
						index: i,
						reason: 'Previous hash link is broken',
						expectedHash: previousBlock.hash,
						actualHash: block.previousHash
					});
				}
			}
		}

		return {
			isTampered: tamperedBlocks.length > 0,
			tamperedBlocks
		};
	}

	/**
	 * Modify a block's data (for demo purposes - to show tampering)
	 * This will break the chain integrity
	 */
	async modifyBlock(index: number, newData: Partial<SupplyChainData>): Promise<BlockClass | null> {
		const block = this.getBlock(index);
		if (!block) {
			return null;
		}

		// Modify the data
		block.data = { ...block.data, ...newData };

		// Recalculate hash (but don't update previous blocks, breaking the chain)
		await block.calculateHash();

		return block;
	}

	/**
	 * Export chain to JSON
	 */
	exportChain(): Block[] {
		return this.chain.map((block) => block.toJSON());
	}

	/**
	 * Import chain from JSON
	 */
	importChain(chainData: Block[]): void {
		this.chain = chainData.map((blockData) => BlockClass.fromJSON(blockData));
	}

	/**
	 * Get chain length
	 */
	getLength(): number {
		return this.chain.length;
	}
}

