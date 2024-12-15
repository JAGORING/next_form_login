import db from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditProfile from './components/EditProfile';

const getUserData = async (id: number) => {
  try {
    const userData = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        password: true,
      },
    });

    return userData;
  } catch (e) {
    console.log('Get Error : ', e);

    return null;
  }
};

const MyPage = async ({ params }: { params: { userId: number } }) => {
  const _userId = Number(params.userId);
  const user = await getUserData(_userId);
  if (isNaN(_userId) || !user) {
    return notFound();
  }
  return (
    <div className="w-full max-w-xl p-6 bg-white shadow-xl rounded-2xl border border-[#e2ddd7]">
      <Link href="/" className="text-[#6b4f4f] text-sm mb-4 block hover:underline">
        ← Back to Home
      </Link>

      <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">📝 Edit Profile</h2>

      <EditProfile user={user} />
    </div>
  );
};

export default MyPage;
