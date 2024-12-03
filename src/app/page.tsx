// 'use client';
import db from '@/lib/db';
import { formatDate } from '@/utils/date';
import Link from 'next/link';
// import React, { useState, useEffect } from 'react';

interface Tweet {
  id: number;
  title: string;
  tweet: string;
  created_at: string;
}

const getTweets = async () => {
  const tweetData = await db.tweet.findMany({
    select: {
      title: true,
      created_at: true,
      tweet: true,
      id: true,
    },
  });
  return tweetData;
  // await new Promise((res) => setTimeout(res, 1000));
};

export default async function Home() {
  const tweetsData = await getTweets();
  // const [tweets, setTweets] = useState<Tweet[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   fetchTweets(currentPage);
  // }, [currentPage]);

  // const fetchTweets = (page: number) => {
  //   const mockTweets = Array.from({ length: 5 }, (_, i) => ({
  //     id: i + 1 + (page - 1) * 5,
  //     username: `user${i + 1}`,
  //     content: `This is tweet #${i + 1 + (page - 1) * 5}`,
  //     timestamp: new Date().toISOString(),
  //   }));
  //   setTweets(mockTweets);
  //   setTotalPages(5);
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-6 md:px-0">
      <div className="w-full max-w-3xl p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
        <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">🐦 Tweets Feed</h2>

        <div className="space-y-4">
          {/* {tweets.map((tweet) => (
           */}
          {tweetsData.map((tweet) => (
            <Link href={`/tweets/${tweet.id}`}>
              <div key={tweet.id} className="p-4 bg-white shadow rounded-lg border border-[#e2ddd7]">
                <p className="font-semibold text-[#6b4f4f]">@{tweet.title}</p>
                <p className="text-sm text-[#8a6a6a]">{formatDate(tweet.created_at)}</p>
                <p className="mt-2 text-[#4a4a4a]">{tweet.tweet}</p>
              </div>
            </Link>
          ))}
        </div>
        {/* 
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#6b4f4f] text-white hover:bg-[#8a6a6a]'
            }`}
          >
            Previous
          </button>

          <span className="text-[#6b4f4f]">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#6b4f4f] text-white hover:bg-[#8a6a6a]'
            }`}
          >
            Next
          </button> 
     </div> */}
      </div>
    </div>
  );
}
