export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
        <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">Welcome</h2>
        <p className="text-sm text-center text-[#8a6a6a] mb-8">Log in and continue your journey 🚀</p>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#8a6a6a]">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 bg-[#fdfcf9] border border-[#d3c9c3] rounded-lg focus:ring-2 focus:ring-[#9b8c85] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-[#8a6a6a]">
              Username
            </label>
            <input
              type="text"
              id="id"
              placeholder="Enter your username"
              className="w-full mt-1 px-4 py-2 bg-[#fdfcf9] border border-[#d3c9c3] rounded-lg focus:ring-2 focus:ring-[#9b8c85] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#8a6a6a]">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 bg-[#fdfcf9] border border-[#d3c9c3] rounded-lg focus:ring-2 focus:ring-[#9b8c85] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#9b8c85] rounded-lg hover:bg-[#8b7b73] focus:ring-2 focus:ring-[#6b4f4f] focus:outline-none"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
