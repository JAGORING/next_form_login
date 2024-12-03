import { formatDate } from '@/utils/date';
import Link from 'next/link';
import { InitTweets } from '../page';

interface TweetBoxProps {
  tweet: InitTweets[number];
}

const TweetBox = ({ tweet }: TweetBoxProps) => {
  return (
    <Link href={`/tweets/${tweet.id}`}>
      <div key={tweet.id} className="mb-3 p-4 bg-white shadow rounded-lg border border-[#e2ddd7]">
        <p className="font-semibold text-[#6b4f4f]">@{tweet.title}</p>
        <p className="text-sm text-[#8a6a6a]">{formatDate(tweet.created_at)}</p>
        <p className="mt-2 text-[#4a4a4a]">{tweet.tweet}</p>
      </div>
    </Link>
  );
};

export default TweetBox;
