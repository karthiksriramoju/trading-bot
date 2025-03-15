import dotenv from "dotenv";
dotenv.config();

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const sol_amount = 0.0001 * LAMPORTS_PER_SOL;

import { swap } from "./swap";
import {getTweets} from "./getTweets";
import { getTokenFromLLM } from "./getTokenFromLLM";

async function main() {
try {
    //const tweet  = await getTweets('karthik6989');
    // if (!tweet?.contents) {
    //   console.log('No tweets found.');
    //   return;
    // }
    // const tokenAddress = await getTokenFromLLM('Buy this , DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263');
    // if (tokenAddress!='null'){
      await swap('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',sol_amount);
    // }
    // else{
    //   console.log('No tweets found.');
    // }
    
  } catch (error) {
    console.error('Error in main:', error);
  }
}


main()


