import type { Block, SupplyChainStepData, ValidationResult, TamperResult } from './types/types.ts';
import { BlockClass } from './block.ts';
import { calculateBlockHash } from './utils/utils.ts';

/**
 * Blockchain Class
 * Represents a complete supply chain built from blocks.
 * 
 * Each Block represents a single step in the supply chain, and the Blockchain
 * represents the complete journey of a product from origin to destination.
 * 
 * Structure: Block (step 1) → Block (step 2) → ... → Blockchain (complete supply chain)
 */
export class Blockchain {
	private chain: BlockClass[];

	constructor() {
		this.chain = [];
	}

	/**
	 * Create the genesis block
	 * The genesis block is the first block in the chain and establishes the initial state
	 * It contains standardized genesis data that represents the beginning of supply chain tracking
	 */
	async createGenesisBlock(): Promise<BlockClass> {
		const genesisData = this.generateGenesisData();
		const randomNonce = Math.floor(Math.random() * 1000000); // Generate random nonce 0-999999
		const genesisBlock = new BlockClass(0, '0', genesisData, undefined, randomNonce);
		await genesisBlock.calculateHash();
		this.chain.push(genesisBlock);
		return genesisBlock;
	}

	/**
	 * Generate standardized genesis block data
	 * This represents the "origin" or "start" of the supply chain tracking system
	 */
	private generateGenesisData(): SupplyChainStepData {
		return {
			step: 'Supply Chain Origin',
			company: 'Blockchain Verification System',
			location: {
				name: 'Global',
				coordinates: {
					lat: 0,
					lng: 0
				}
			},
			product: {
				name: 'Supply Chain Tracking',
				quantity: 1,
				batchId: 'GENESIS-001',
				description: 'Genesis block establishing the supply chain verification system'
			},
			certifications: [
				{
					type: 'SYSTEM_VERIFIED',
					issuer: 'Blockchain Protocol',
					certificateId: 'GENESIS-CERT-001',
					validUntil: '9999-12-31T23:59:59Z' // Effectively permanent
				}
			],
			documents: [
				{
					type: 'SYSTEM_INITIALIZATION',
					documentHash: 'genesis-system-hash-placeholder',
					documentId: 'GENESIS-DOC-001',
					url: 'system://genesis'
				}
			],
			metadata: {
				blockchainVersion: '1.0.0',
				creationTimestamp: new Date().toISOString(),
				systemIntegrity: 'verified',
				trustAnchor: true
			}
		};
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
	async addBlock(data: SupplyChainStepData): Promise<BlockClass> {
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
	async modifyBlock(index: number, newData: Partial<SupplyChainStepData>): Promise<BlockClass | null> {
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

