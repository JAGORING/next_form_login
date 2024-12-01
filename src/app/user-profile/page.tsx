import React from 'react';

export default function UserProfile() {
  const user = {
    email: 'johndoe@example.com',
    username: 'johndoe',
    joinedDate: '2023-01-15',
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
        <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">User Profile</h2>
        <p className="text-sm text-center text-[#8a6a6a] mb-8">Here’s your account info 📋</p>

        <div className="space-y-4">
          <div className="text-[#6b4f4f]">
            <strong>Email:</strong> <span className="ml-2">{user.email}</span>
          </div>
          <div className="text-[#6b4f4f]">
            <strong>Username:</strong> <span className="ml-2">{user.username}</span>
          </div>
          <div className="text-[#6b4f4f]">
            <strong>Joined Date:</strong> <span className="ml-2">{user.joinedDate}</span>
          </div>
        </div>

        {/* <div className="mt-8 text-center">
          <button className="px-4 py-2 text-white bg-[#6b4f4f] rounded-lg hover:bg-[#8a6a6a] focus:outline-none">
            Edit Profile
          </button>
        </div> */}
      </div>
    </div>
  );
}
