export const VerificationSkeleton = () => {
  return (
    <div className="md:w-full w-[358px] mt-7 animate-pulse">
      {/* Header */}
      <div className="flex items-end justify-between bg-[#3C4040] px-5 py-3 rounded-t-[20px] border-b border-[#333333]">
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-[#4a4a4a] rounded"></div>
          <div className="h-6 w-32 bg-[#4a4a4a] rounded"></div>
        </div>
        <div className="h-6 w-20 bg-[#F79400]/40 rounded-full"></div>
      </div>

      {/* Body */}
      <div className="bg-[#3C4040] px-4 pt-4 rounded-b-[16px]">
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-4 w-[118px] bg-[#4a4a4a] rounded"></div>
              <div className="h-4 flex-1 bg-[#4a4a4a] rounded"></div>
            </div>
          ))}
        </div>

        {/* Message box */}
        <div className="bg-[#272727] rounded-[12px] py-[14px] px-4 my-4 space-y-2">
          <div className="h-4 w-full bg-[#3a3a3a] rounded"></div>
          <div className="h-4 w-3/4 bg-[#3a3a3a] rounded"></div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <div>
            <div className="h-12 w-full bg-[#e5e5e5]/40 rounded-full"></div>
            <div className="h-6 w-24 bg-[#4a4a4a] rounded mx-auto mt-4"></div>
          </div>
          <div>
            <div className="h-12 w-full bg-[#000000]/40 rounded-full"></div>
            <div className="h-6 w-24 bg-[#4a4a4a] rounded mx-auto mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
