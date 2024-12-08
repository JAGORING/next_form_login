import db from '@/lib/db';
import { formatDate } from '@/utils/date';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: number } }) {
  const tweet = await getTweetDetail(Number(params.id));
  return { title: tweet?.title };
}

const getTweetDetail = async (id: number) => {
  const tweetData = await db.tweet.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweetData;
};

const TweetDetail = async ({ params }: { params: { id: number } }) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const tweetDetail = await getTweetDetail(id);
  if (!tweetDetail) {
    return notFound();
  }

  if (!tweetDetail) return <p>Loading tweet details...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
        <Link href="/" className="text-[#6b4f4f] text-sm mb-4 block hover:underline">
          ← Back to Tweets
        </Link>

        <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">🐦 Tweet Detail</h2>
        <div className="p-4 bg-white shadow rounded-lg border border-[#e2ddd7]">
          <p className="font-semibold text-[#6b4f4f]">
            {tweetDetail.title} <span className="font-medium text-[#6b4f4f] text-xs">@{tweetDetail.user.username}</span>
          </p>
          <p className="text-sm text-[#8a6a6a]">{formatDate(tweetDetail.created_at)}</p>
          <p className="mt-4 text-[#4a4a4a]">{tweetDetail.tweet}</p>
        </div>
      </div>
    </div>
  );
};

export default TweetDetail;
