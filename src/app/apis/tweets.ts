'use server';
import db from '@/lib/db';

export async function fetchTweets(page: number) {
  const tweetData = await db.tweet.findMany({
    select: {
      title: true,
      created_at: true,
      tweet: true,
      id: true,
    },
    skip: (page - 1) * 4,
    take: 4,
    orderBy: {
      created_at: 'desc',
    },
  });
  return tweetData;
}

export async function getTweetsCount() {
  const count = await db.tweet.count();

  return count;
}
