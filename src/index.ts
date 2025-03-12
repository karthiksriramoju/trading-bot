import dotenv from "dotenv";
dotenv.config();


import {getTweets} from "./getTweets";
import { getTokenFromLLM } from "./getTokenFromLLM";

async function main() {
try {
    const tweet  = await getTweets('karthikS17');
    if (!tweet?.contents) {
      throw new Error("Tweet contents are undefined");
    }
    const tokenAddress = await getTokenFromLLM(tweet.contents);
    console.log(tokenAddress);
    
  } catch (error) {
    console.error('Error in main:', error);
  }
}


main()


