import dotenv from "dotenv";
dotenv.config();


import {getTweets} from "./getTweets";
import { getTokenFromLLM } from "./getTokenFromLLM";

async function main() {
try {
    const tweet  = await getTweets('karthik6989');
    // if (!tweet?.contents) {
    //   console.log('No tweets found.');
    //   return;
    // }
    const tokenAddress = await getTokenFromLLM(tweet?.contents ?? "");
    console.log(tokenAddress);
    
  } catch (error) {
    console.error('Error in main:', error);
  }
}


main()


