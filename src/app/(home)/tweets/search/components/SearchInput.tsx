'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams(searchParams);
    if (keyword) {
      params.set('query', keyword);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
        placeholder="Enter a keyword..."
        className="w-full px-4 py-2 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f]"
      />
      <button type="button" className="hidden">
        Search
      </button>
    </div>
  );
};

export default SearchInput;
