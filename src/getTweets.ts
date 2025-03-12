import axios from "axios";

export async function getTweets(userName:string) {

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://twttrapi.p.rapidapi.com/user-tweets?username=${userName}`,
  headers: {
    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPIDAPI_KEY // Replace with your RapidAPI key
  }
};

axios.request(config)
  .then((response) => {
    const data = response.data;

    // Extract all tweets from the timeline
    const instructions = data?.data?.user_result?.result?.timeline_response?.timeline?.instructions;

    if (!instructions || instructions.length === 0) {
      console.log('No tweets found.');
      return;
    }

    // Function to convert Twitter `created_at` string to a Date object
    const parseTwitterDate = (createdAt:any) => {
      return new Date(createdAt);
    };

    // Find the latest tweet
    let latestTweet = null;
    for (const instruction of instructions) {
      if (instruction.__typename === 'TimelineAddEntries' || instruction.__typename === 'TimelinePinEntry') {
        const entries = instruction.entries || [];
        for (const entry of entries) {
          if (entry.content?.__typename === 'TimelineTimelineItem' &&
              entry.content.content?.__typename === 'TimelineTweet') {
            const tweet = entry.content.content.tweetResult.result;

            // Check if the tweet has a valid `created_at` field
            if (tweet.legacy?.created_at) {
              const tweetDate = parseTwitterDate(tweet.legacy.created_at);

              // Update the latest tweet if this tweet is newer
              if (!latestTweet || tweetDate > parseTwitterDate(latestTweet.legacy.created_at)) {
                latestTweet = tweet;
              }
            }
          }
        }
      }
    }

    if (latestTweet) {
      
      console.log(`Text: ${latestTweet.legacy.full_text}`);
      console.log(`Created At: ${latestTweet.legacy.created_at}`);
      console.log(`Retweets: ${latestTweet.legacy.retweet_count}`);
      console.log(`Likes: ${latestTweet.legacy.favorite_count}`);
    } else {
      console.log('No valid tweets found.');
    }
  })
  .catch((error) => {
    console.error('Error fetching tweets:', error);
  });

}

//how to get back the latest tweet from the function