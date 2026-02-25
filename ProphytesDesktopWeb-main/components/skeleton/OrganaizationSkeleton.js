const OrganizationSkeleton = () => {
  return (
    <div
      className="
        2xl:h-[126px] sm:h-[85px] h-[104px]
        2xl:p-5 p-3 w-full
        rounded-[8px]
        bg-gray-300/30
        animate-pulse
        relative
      "
    >
      {/* Check icon placeholder */}
      <div className="absolute w-5 h-5 rounded-full top-4 right-3 bg-gray-400/50" />

      <div className="flex flex-col justify-between h-full">
        {/* Logo skeleton */}
        <div className="h-6 rounded w-14 bg-gray-400/50" />

        {/* Text skeleton */}
        <div className="w-3/4 h-4 rounded bg-gray-400/50" />
      </div>
    </div>
  );
};

export default OrganizationSkeleton;
