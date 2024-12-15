'use server';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

const LogoutButton = () => {
  const handleLogout = async () => {
    const session = await getSession();
    await session.destroy();

    redirect('/');
  };
  return (
    <form action={handleLogout}>
      <button className="w-full mt-2 py-2 bg-[#6b4f4f] text-white font-medium text-sm rounded-md shadow hover:bg-[#593d3d] transition">
        로그아웃
      </button>
    </form>
  );
};

export default LogoutButton;
