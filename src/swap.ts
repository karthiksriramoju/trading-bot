import { Transaction, VersionedTransaction, sendAndConfirmTransaction, PublicKey } from '@solana/web3.js';
import { Keypair, Connection } from '@solana/web3.js';
import axios from 'axios';
import { API_URLS } from '@raydium-io/raydium-sdk-v2';
import bs58 from 'bs58';

const owner: Keypair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!));
const connection: Connection = new Connection(process.env.RPC_URL!, 'confirmed');

const SWAP_HOST: string = API_URLS.SWAP_HOST;
const PRIORITY_FEE_URL: string = `${API_URLS.BASE_HOST}${API_URLS.PRIORITY_FEE}`;
const SOL_MINT: string = 'So11111111111111111111111111111111111111112'; // Native SOL mint address

export async function swap(outputMint: string, amountInLamports: number): Promise<void> {
    try {
        const slippageBps: number = 200; // 2% slippage (increased from 0.5%)
        const txVersion: string = 'V0';

        // Fetch priority fee
        const { data: priorityData } = await axios.get(PRIORITY_FEE_URL);
        const computeUnitPriceMicroLamports: string = String(priorityData.data.default.h);

        // Get swap quote
        const { data: swapResponse } = await axios.get(
            `${SWAP_HOST}/compute/swap-base-in?inputMint=${SOL_MINT}&outputMint=${outputMint}&amount=${amountInLamports}&slippageBps=${slippageBps}&txVersion=${txVersion}`
        );

        console.log('Swap Response:', swapResponse);

        // Serialize transaction
        const { data: swapTransactions } = await axios.post(
            `${SWAP_HOST}/transaction/swap-base-in`,
            {
                computeUnitPriceMicroLamports,
                swapResponse,
                txVersion,
                wallet: owner.publicKey.toBase58(),
                wrapSol: true, // Wrap SOL to wSOL
                unwrapSol: false, // Do not unwrap wSOL to SOL
            }
        );

        console.log('Swap Transactions:', swapTransactions);

        // Deserialize transactions
        const allTxBuf: Buffer[] = swapTransactions.data.map((tx: { transaction: string }) => Buffer.from(tx.transaction, 'base64'));
        const allTransactions: VersionedTransaction[] = allTxBuf.map((txBuf : any) => VersionedTransaction.deserialize(txBuf));

        // Sign and execute transactions
        for (const transaction of allTransactions) {
            transaction.sign([owner]);
            const txId: string = await connection.sendTransaction(transaction, { skipPreflight: true });
            console.log(`Transaction sent, txId: ${txId}`);
            await connection.confirmTransaction(txId, 'confirmed');
            console.log(`Transaction confirmed`);
        }
    } catch (error) {
        console.error('Swap failed:', error);
    }
}
