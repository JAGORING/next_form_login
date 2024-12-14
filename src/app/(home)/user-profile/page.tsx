import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { formatDate } from '@/utils/date';
import { notFound, redirect } from 'next/navigation';

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: { id: session.id },
    });
    if (user) {
      return user;
    }
  }
  notFound();
};

export default async function UserProfile() {
  const user = await getUser();
  const handleLogout = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();

    redirect('/');
  };
  return (
    <div className="w-full max-w-md p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
      <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">User Profile</h2>
      <p className="text-sm text-center text-[#8a6a6a] mb-8">Here’s your account info 📋</p>

      <div className="space-y-4">
        <div className="text-[#6b4f4f]">
          <strong>Email:</strong> <span className="ml-2">{user?.email}</span>
        </div>
        <div className="text-[#6b4f4f]">
          <strong>Username:</strong> <span className="ml-2">{user?.username}</span>
        </div>
        {user?.created_at && (
          <div className="text-[#6b4f4f]">
            <strong>Joined Date:</strong>{' '}
            <span className="ml-2">{formatDate(user?.created_at)}</span>
          </div>
        )}
      </div>
      <form action={handleLogout}>
        <button className="w-full mt-8 py-2 px-4 bg-[#6b4f4f] text-white font-medium text-sm rounded-md shadow hover:bg-[#593d3d] transition">
          로그아웃
        </button>
      </form>
    </div>
  );
}
