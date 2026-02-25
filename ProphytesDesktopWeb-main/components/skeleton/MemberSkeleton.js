const MemberCardSkeleton = () => {
  return (
    <div className="group pt-8 rounded-[20px] bg-black transition-colors duration-500 animate-pulse">
      <div className="rounded-[10px] relative">
        {/* Top Row */}
        <div className="flex justify-between px-8">
          <div className="w-[60px] h-[30px] bg-gray-700 rounded-md"></div>
          <div className="w-[40px] h-[40px] bg-gray-700 rounded-full"></div>
        </div>

        {/* Avatar */}
        <div className="relative flex justify-center mt-7">
          <div className="relative h-[150px] w-[150px] m-auto text-center">
            <div className="p-2 bg-gray-800 rounded-full">
              <div className="rounded-full h-[134px] w-[134px] bg-gray-700"></div>
            </div>

            {/* Status Badge */}
            <div className="absolute right-0 bottom-7 p-1 bg-[#202020] flex items-center justify-center rounded-full h-9 w-9">
              <div className="w-[28px] h-[28px] bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Side rotated text */}

        {/* Bottom Info */}
        <div className="flex flex-col items-center mt-6 border border-transparent rounded-b-[16px]">
          <div className="h-3 mt-5 bg-gray-700 rounded-md w-28"></div>

          <div className="h-5 w-32 bg-gray-600 rounded-md mt-3 mb-[15px]"></div>

          <div className="w-32 mt-4 mb-6 bg-gray-700 rounded-full h-9"></div>
        </div>
      </div>
    </div>
  );
};

export default MemberCardSkeleton;
