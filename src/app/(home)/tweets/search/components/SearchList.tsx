import Link from 'next/link';
import { getTweetsByKeyword } from '../action';
import { TweetType } from '../page';

const SearchList = async ({ query }: { query: string }) => {
  const tweetsData: TweetType[] = await getTweetsByKeyword(query);

  return (
    <div className="flex flex-col gap-2">
      {tweetsData.length > 0 ? (
        tweetsData.map((tweet) => {
          const truncatedTweet = tweet.tweet.length > 100 ? `${tweet.tweet.slice(0, 100)}...` : tweet.tweet;
          return (
            <Link href={`/tweets/${tweet.id}`} key={tweet.id}>
              <div className="p-4 bg-[#fdfcf9] shadow rounded-lg border border-[#e2ddd7] hover:bg-[#fbf7f3] transition">
                <h3 className="font-semibold text-[#6b4f4f]">{tweet.title}</h3>
                <p className="text-sm text-[#8a6a6a] mb-2">@{tweet.user.username}</p>
                <p className="text-[#4a4a4a]">{truncatedTweet}</p>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="text-sm text-[#8a6a6a]">No tweets found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchList;
