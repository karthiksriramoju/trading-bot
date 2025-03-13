import { Connection, Transaction, VersionedTransaction, sendAndConfirmTransaction } from '@solana/web3.js'
import { NATIVE_MINT } from '@solana/spl-token'
import axios from 'axios'
import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'
import { API_URLS } from '@raydium-io/raydium-sdk-v2'

const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/D747bvNsI_FXaIBlmf2lCgxcRHQu1sED')
export const owner = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!))

export async function swap(tokenAddress: string,amount: number) {
  console.log('tokenAddress',tokenAddress);
  console.log('amount',amount);
}