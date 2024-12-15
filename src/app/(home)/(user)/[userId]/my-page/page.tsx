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

const MyPage = async ({ params }: { params: { userId: number } }) => {
  const _userId = Number(params.userId);

  if (isNaN(_userId)) {
    return notFound();
  }

  const user = await getUserData(_userId);

  return (
    <div className="w-full max-w-xl p-6 bg-white shadow-xl rounded-2xl border border-[#e2ddd7]">
      <Link href="/my-tweets" className="text-[#6b4f4f] text-sm mb-4 block hover:underline">
        ← Back to My Page
      </Link>

      <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">📝 Edit Profile</h2>

      {/* <form action={() => {}} className="space-y-4"> */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-[#6b4f4f]">
          Username
        </label>
        <input
          type="text"
          name="username"
          defaultValue={user?.username}
          className="w-full px-4 py-2 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f]"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#6b4f4f]">
          Email
        </label>
        <input
          type="email"
          name="email"
          defaultValue={user?.email}
          className="w-full px-4 py-2 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f]"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-[#6b4f4f]">
          Bio
        </label>
        <textarea
          name="bio"
          rows={4}
          className="w-full px-4 py-2 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f]"
        ></textarea>
      </div>

      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-[#6b4f4f]">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          className="w-full px-4 py-2 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f]"
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-[#6b4f4f]">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          className="w-full px-4 py-2 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f]"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#6b4f4f] text-white font-medium py-2 rounded-lg hover:bg-[#5a4040] transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default MyPage;
