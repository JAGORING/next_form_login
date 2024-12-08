import db from '@/lib/db';
import { unstable_cache as nextCache } from 'next/cache';
import { formatDate } from '@/utils/date';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LikeBtn from '../../components/LikeBtn';
import { getSession } from '@/lib/session';

export async function generateMetadata({ params }: { params: { id: number } }) {
  const tweet = await getTweetDetail(Number(params.id));
  return { title: tweet?.title };
}

const getTweetDetail = async (id: number) => {
  try {
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
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
    return tweetData;
  } catch (e) {
    return null;
  }
};

const getLikeStatus = async (tweetId: number, userId: number) => {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCnt = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCnt,
    isLiked: Boolean(isLiked),
  };
};

const getCachedTweet = nextCache(getTweetDetail, ['tweet-detail'], {
  tags: ['tweet-detail'],
  revalidate: 60,
});

const getCachedLikeStatus = async (postId: number) => {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ['product-like-status'], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId!);
};

const TweetDetail = async ({ params }: { params: { id: number } }) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const tweetDetail = await getCachedTweet(id);
  if (!tweetDetail) {
    return notFound();
  }
  if (!tweetDetail) return <p>Loading tweet details...</p>;
  const { likeCnt, isLiked } = await getCachedLikeStatus(id);
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

          <LikeBtn isLiked={isLiked} likeCnt={likeCnt} tweetId={id} />

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#6b4f4f] mb-4">Replies</h3>
            <ul className="space-y-4">
              {/* {tweetDetail.replies.map((reply, index) => ( */}
              <li key={1} className="p-3 bg-white border border-[#e2ddd7] rounded-lg shadow">
                <p className="text-sm text-[#6b4f4f] font-medium">
                  {/* @{reply.user.username} */}
                  {/* JAGORING <span className="text-xs text-[#8a6a6a]">{formatDate(reply.created_at)}</span> */}
                </p>
                {/* <p className="mt-2 text-[#4a4a4a]">{reply.content}</p> */}
              </li>
              {/* ))} */}
            </ul>

            <form
              // onSubmit={handleReplySubmit}
              className="mt-4 space-y-3 bg-white p-4 border border-[#e2ddd7] rounded-lg shadow"
            >
              <textarea
                name="reply"
                placeholder="Write your reply..."
                rows={2}
                maxLength={100}
                className="w-full px-3 py-1 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#8a6a6a]">Max: 100 characters</p>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#6b4f4f] text-white rounded-lg font-semibold hover:bg-[#5a4040] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f] focus:ring-offset-2"
                >
                  Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetDetail;
