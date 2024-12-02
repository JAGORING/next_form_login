import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
        <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">Welcome</h2>
        <p className="text-sm text-center text-[#8a6a6a] mb-8">Log in and continue your journey 🚀</p>
        <div className="mt-6 text-center">
          <Link href="/login" className="text-[#6b4f4f] text-sm hover:underline font-semibold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
