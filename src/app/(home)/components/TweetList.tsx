'use client';
import { useEffect, useState } from 'react';
import TweetBox from './TweetBox';
import { InitTweets } from '../page';
import { fetchTweets, getTweetsCount } from '@/app/apis/tweets';

const TweetList = ({ initTweetsData }: { initTweetsData: InitTweets }) => {
  const [tweets, setTweets] = useState(initTweetsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTweetsCount = async () => {
      try {
        const tweetsCnt = await getTweetsCount();
        setTotalPages(Math.ceil(tweetsCnt / 4));
      } catch (error) {
        setTotalPages(1);
      }
    };
    fetchTweetsCount();
  }, []);

  const handleNextPage = async () => {
    setIsLoading(true);
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    const newTweets = await fetchTweets(currentPage + 1);

    setTweets(newTweets);
    setIsLoading(false);
  };

  const handlePreviousPage = async () => {
    setIsLoading(true);
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    const newTweets = await fetchTweets(currentPage - 1);

    setTweets(newTweets);
    setIsLoading(false);
  };

  if (!tweets) {
    return <p>Not found tweet...</p>;
  }
  return (
    <>
      <div className="h-full relative">
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <TweetBox tweet={tweet} key={tweet.id} />
          ))}
        </div>
        <div className="flex justify-between items-center absolute w-full bottom-10">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1 || isLoading}
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
            disabled={currentPage === totalPages || isLoading}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#6b4f4f] text-white hover:bg-[#8a6a6a]'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default TweetList;
