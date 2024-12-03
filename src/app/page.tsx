import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import TweetList from './components/TweetList';

const getInitTweets = async () => {
  const tweetData = await db.tweet.findMany({
    select: {
      title: true,
      created_at: true,
      tweet: true,
      id: true,
    },
    take: 4,
    orderBy: {
      created_at: 'desc',
    },
  });
  return tweetData;
};

export type InitTweets = Prisma.PromiseReturnType<typeof getInitTweets>;

export default async function Home() {
  const initTweetsData = await getInitTweets();
  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-6 md:px-0">
      <div className="w-full max-w-3xl p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
        <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">🐦 Tweets Feed</h2>

        <TweetList initTweetsData={initTweetsData} />
      </div>
    </div>
  );
}
