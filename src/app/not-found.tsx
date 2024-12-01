import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 shadow-xl rounded-2xl border border-[#e2ddd7] text-center bg-[#fdfcf9]">
        <h1 className="text-6xl font-bold text-[#6b4f4f] mb-4">404</h1>
        <p className="text-lg text-[#8a6a6a] mb-6">Oops! We couldn't find that page.</p>
        <p className="text-sm text-[#8a6a6a] mb-8">
          The page you're looking for might have been moved or doesn't exist. 🕵️‍♂️
        </p>

        <a
          href="/"
          className="inline-block py-2 px-4 bg-[#6b4f4f] text-white font-medium text-sm rounded-md shadow hover:bg-[#593d3d] transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
