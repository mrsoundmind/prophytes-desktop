const UserCardSkeleton = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] rounded-lg animate-pulse">
      <div className="relative flex items-center justify-center w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white">
        <div className="w-full h-full bg-[#333] rounded-full" />
      </div>

      <div className="flex-1 ml-3">
        <div className="h-[18px] w-[120px] bg-[#333] rounded-md" />
      </div>

      <div className="flex items-center gap-3">
        <div className="h-[32px] w-[80px] bg-[#333] rounded-md" />
      </div>
    </div>
  );
};

export default UserCardSkeleton;
