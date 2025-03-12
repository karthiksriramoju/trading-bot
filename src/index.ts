import dotenv from "dotenv";
dotenv.config();

import {getTweets} from "./getTweets";

async function main() {
  
  const tweet = await getTweets('karthikS17');

}

main()


