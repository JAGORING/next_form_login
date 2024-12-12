import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import TweetList from './components/TweetList';
import Link from 'next/link';

export const metadata = {
  title: 'Home',
};

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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-center text-[#6b4f4f]">🐦 Tweets Feed</h2>
          <div>
            <Link
              href="/tweets/search"
              className="mr-2 py-2 px-4 bg-[#6b4f4f] text-sm text-white rounded-lg shadow hover:bg-[#5a4040] transition"
            >
              🔍 Search Tweets
            </Link>
            <Link href="/tweets/add-tweet">
              <span className="bg-[#6b4f4f] text-sm text-white py-2 px-4 rounded-lg  hover:bg-[#5a4040] transition">
                ➕ Add a Tweet
              </span>
            </Link>
          </div>
        </div>
        <TweetList initTweetsData={initTweetsData} />
      </div>
    </div>
  );
}
