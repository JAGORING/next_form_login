'use client';
import Link from 'next/link';
import { useState } from 'react';

const UserMenu = ({ userId }: { userId: number }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <img
        src="/user-avatar.jpg"
        alt="User Avatar"
        className="w-10 h-10 rounded-full cursor-pointer hover:shadow-lg"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-[#e2ddd7] rounded-lg shadow-lg z-10">
          <Link
            href={`/${userId}/my-tweets`}
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
        </div>
      )}
    </div>
  );
};

export default UserMenu;
