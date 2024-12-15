'use client';
import LogoutButton from '@/app/components/LogoutButton';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const UserMenu = ({ userId }: { userId: number }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <Image
        src="/images/default-user.png"
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full cursor-pointer hover:shadow-lg"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-[#e2ddd7] rounded-lg shadow-lg z-10">
          <Link
            href={`/${userId}/user-tweets`}
            className="block px-4 py-2 text-sm text-[#4a4a4a] hover:bg-[#f7f2ee] transition"
          >
            📝 My Tweets
          </Link>
          <Link
            href={`/${userId}/my-page`}
            className="block px-4 py-2 text-sm text-[#4a4a4a] hover:bg-[#f7f2ee] transition"
          >
            🏠 My Page
          </Link>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
