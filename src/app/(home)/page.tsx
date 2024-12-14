import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import TweetList from './components/TweetList';
import Link from 'next/link';
import UserMenu from './components/UserMenu';

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
    <div className="flex items-center justify-center min-h-screen py-10 px-6 md:px-0 ">
      <div className="w-full min-w-[550px] max-w-3xl p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7] h-[750px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-[#6b4f4f]">🐦 All Tweets</h1>
            <Link href="/search" className="text-[#6b4f4f] hover:text-[#5a4040] transition">
              🔍
            </Link>
          </div>

          <UserMenu />
        </div>
        <div className="float-end">
          <Link href="/tweets/add-tweet">
            <span className="bg-[#6b4f4f] text-sm text-white py-2 px-4 rounded-lg  hover:bg-[#5a4040] transition">
              ➕ Add a Tweet
            </span>
          </Link>
        </div>
        <TweetList initTweetsData={initTweetsData} />
      </div>
    </div>
  );
}
