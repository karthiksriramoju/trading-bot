import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://twttrapi.p.rapidapi.com/user-tweets?username=karthikS17',
  headers: {
    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
    'x-rapidapi-key': process.env.YOUR_RAPIDAPI_KEY // Replace with your RapidAPI key
  }
};

axios.request(config)
  .then((response:any) => {
    const data = response.data;

    // Extract the timeline entries
    const entries = data?.data?.user_result?.result?.timeline_response?.timeline?.instructions
      ?.find((instruction : any) => instruction.__typename === 'TimelineAddEntries')?.entries;

    if (!entries || entries.length === 0) {
      console.log('No tweets found.');
      return;
    }

    // Find the latest tweet
    let latestTweet = null;
    for (const entry of entries) {
      if (entry.content?.__typename === 'TimelineTimelineItem' &&
          entry.content.content?.__typename === 'TimelineTweet') {
        const tweet = entry.content.content.tweetResult.result;
        if (!latestTweet || tweet.legacy.created_at > latestTweet.legacy.created_at) {
          latestTweet = tweet;
        }
      }
    }

    if (latestTweet) {
      console.log('Latest Tweet:');
      console.log(`Text: ${latestTweet.legacy.full_text}`);
      console.log(`Created At: ${latestTweet.legacy.created_at}`);
      console.log(`Retweets: ${latestTweet.legacy.retweet_count}`);
      console.log(`Likes: ${latestTweet.legacy.favorite_count}`);
    } else {
      console.log('No valid tweets found.');
    }
  })
  .catch((error:any) => {
    console.error('Error fetching tweets:', error);
  });