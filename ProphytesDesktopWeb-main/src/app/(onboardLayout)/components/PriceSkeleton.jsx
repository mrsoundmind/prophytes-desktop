const PriceSkeleton = () => {
  return (
    <div className="overflow-hidden bg-[#000000] animate-pulse">
      <div className="relative w-full mx-auto overflow-hidden">
        {/* Background placeholders */}
        <div className="absolute hidden -left-10 -top-40 lg:block">
          <div className="h-[700px] w-[700px] bg-[#141414] rounded-full opacity-30 blur-3xl" />
        </div>
        <div className="absolute right-0 hidden -top-40 lg:block">
          <div className="h-[700px] w-[700px] bg-[#141414] rounded-full opacity-30 blur-3xl" />
        </div>

        <div className="container">
          {/* Main heading */}
          <div className="max-w-[980px] block mx-auto md:mt-20 mt-[30px] text-center">
            <div className="h-[80px] bg-[#1a1a1a] rounded-md w-[80%] mx-auto mb-4"></div>
            <div className="h-[20px] bg-[#1a1a1a] rounded-md w-[60%] mx-auto"></div>
          </div>
        </div>

        <div className="">
          <div className="bg-[#000000]  xl:p-10 sm:p-6 p-4 animate-pulse">
            {/* Image placeholder */}
            <div className="w-[80px] h-[80px] bg-[#1a1a1a] rounded-md mb-4"></div>

            {/* Title */}
            <div className="h-[32px] w-[180px] bg-[#1a1a1a] rounded-md mb-3"></div>

            {/* Description + Price */}
            <div className="flex flex-wrap items-end justify-between gap-3 pt-1 sm:pt-4">
              <div className="w-[253px] h-[60px] bg-[#1a1a1a] rounded-md"></div>
              <div className="w-[100px] h-[28px] bg-[#1a1a1a] rounded-md"></div>
            </div>

            {/* Features list */}
            <div className="w-full m-auto">
              <div className="block w-full mt-[30px] bg-[#141616] sm:px-6 px-4 border border-[#383838] rounded-[16px]">
                <ul>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-4 py-[18px] ${
                        i !== 4 ? "border-b border-[#000000]" : ""
                      }`}
                    >
                      <div className="w-5 h-5 bg-[#1a1a1a] rounded-full"></div>
                      <div className="h-[20px] w-[200px] bg-[#1a1a1a] rounded-md"></div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button placeholder */}
              <div className="w-full h-[56px] bg-[#1a1a1a] rounded-full mt-[30px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSkeleton;
