import db from '@/lib/db';
import { unstable_cache as nextCache } from 'next/cache';
import { formatDate } from '@/utils/date';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LikeBtn from '../../components/LikeBtn';
import { getSession } from '@/lib/session';
import TweetComments from '../../components/TweetComments';

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
            id: true,
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

const getCommentsByTweetId = async (tweetId: number) => {
  try {
    const comments = await db.comment.findMany({
      where: {
        tweetId: tweetId,
      },
      select: {
        id: true,
        comment: true,
        created_at: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return comments;
  } catch (e) {
    return [];
  }
};

const getCachedTweet = nextCache(getTweetDetail, ['tweet-detail'], {
  tags: ['tweet-detail'],
  revalidate: 60,
});

const getCachedLikeStatus = async (tweetId: number) => {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ['tweet-like-status'], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId!);
};
const getCachedComments = async (tweetId: number) => {
  const cachedOperation = nextCache(getCommentsByTweetId, ['tweet-comments'], {
    tags: [`comment-${tweetId}`],
  });
  return cachedOperation(tweetId);
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
  const comments = await getCachedComments(id);

  return (
    <div className="w-full max-w-md p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
      <Link href="/" className="text-[#6b4f4f] text-sm mb-4 block hover:underline">
        ← Back to Home
      </Link>

      <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">🐦 Tweet Detail</h2>
      <div className="p-4 bg-white shadow rounded-lg border border-[#e2ddd7]">
        <p className="font-semibold text-[#6b4f4f]">
          {tweetDetail.title}
          <Link href={`/${tweetDetail.user.id}/user-tweets`}>
            <span className="ml-1 font-medium text-[#6b4f4f] text-xs">
              @{tweetDetail.user.username}
            </span>
          </Link>
        </p>
        <p className="text-sm text-[#8a6a6a]">{formatDate(tweetDetail.created_at)}</p>
        <p className="mt-4 text-[#4a4a4a]">{tweetDetail.tweet}</p>

        <LikeBtn isLiked={isLiked} likeCnt={likeCnt} tweetId={id} />
        <TweetComments comments={comments} tweetId={id} />
      </div>
    </div>
  );
};

export default TweetDetail;
