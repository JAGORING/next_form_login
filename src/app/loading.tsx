const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdfcf9]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#6b4f4f] border-opacity-80 mb-4"></div>
        <p className="text-[#6b4f4f] text-lg font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
