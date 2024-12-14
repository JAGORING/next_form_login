const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#6b4f4f] border-opacity-80 mb-8"></div>
      <p className="text-[#6b4f4f] text-lg font-semibold">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
