import Link from 'next/link';
import SearchList from './components/SearchList';
import SearchInput from './components/SearchInput';

export interface TweetType {
  tweet: string;
  id: number;
  title: string;
  created_at: Date;
  user: {
    username: string;
  };
}

const Search = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || '';

  return (
    <div className="w-full max-w-2xl p-6 bg-white shadow-xl rounded-2xl border border-[#e2ddd7] max-h-[750px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <Link href="/" className="text-[#6b4f4f] text-sm mb-4 block hover:underline">
        ← Back to Home
      </Link>

      <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">🔍 Search Tweets</h2>
      <SearchInput />
      <SearchList query={query} />
    </div>
  );
};

export default Search;
