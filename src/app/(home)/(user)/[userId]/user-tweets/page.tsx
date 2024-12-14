import db from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const getUserData = async (id: number) => {
  try {
    const userData = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        tweets: {
          orderBy: {
            created_at: 'asc',
          },
        },
      },
    });

    return userData;
  } catch (e) {
    return null;
  }
};

const UserTweetPage = async ({ params }: { params: { userId: number } }) => {
  const _userId = Number(params.userId);

  if (isNaN(_userId)) {
    return notFound();
  }

  const user = await getUserData(_userId);
  if (!user) notFound();
  return (
    <div className="w-full max-w-2xl p-6 bg-white shadow-xl rounded-2xl border border-[#e2ddd7]">
      <Link href="/" className="text-[#6b4f4f] text-sm mb-4 block hover:underline">
        ← Back to Home
      </Link>

      <div className="mb-6">
        <div className="flex items-center space-x-4 border-b border-[#e2ddd7] pb-4">
          <img
            //   src={user.avatarUrl}
            src={''}
            alt={`${user.username} avatar`}
            className="w-16 h-16 rounded-full shadow"
          />
          <div>
            <h2 className="text-xl font-semibold text-[#6b4f4f]">{user.email}</h2>
            <p className="text-sm text-[#8a6a6a]">@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 h-[550px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {user.tweets.length > 0 ? (
          user.tweets.map((tweet) => (
            <div
              key={tweet.id}
              className=" p-4 bg-[#fdfcf9] shadow rounded-lg border border-[#e2ddd7] hover:bg-[#fbf7f3] transition"
            >
              <h3 className="font-semibold text-[#6b4f4f]">{tweet.title}</h3>
              <p className="text-[#4a4a4a]">{tweet.tweet}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#8a6a6a]">No tweets found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default UserTweetPage;
