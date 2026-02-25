import { useCallback, useRef, useState } from "react";
import ProphytesFilter from "./ProphytesFilter";
import ProphytesSkeleton from "../skeleton/ProphytesSkeleton";

const ProphytesInfiniteScroll = ({
  items,
  hasMore,
  loadMore,
  renderItem,
  loader,
}) => {
  const observer = useRef();
  const [filterItem, setFilterItem] = useState(true);

  const getShortCode = (organization) => {
    return organization
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loader) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMore, loader]
  );

  return (
    <div className="py-20 bg-[#141616] min-h-screen">
      <div className="container">
        {/* Filter */}
        <div>
          <ProphytesFilter
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        </div>

        {/* Loading Placeholder for Initial Load */}
        {loader && items.length === 0 ? (
          <div className="grid gap-3 sm:gap-6 lg:grid-cols-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProphytesSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div>
            {filterItem && (
              <div>
                <div className="grid items-stretch gap-3 sm:gap-6 lg:grid-cols-2">
                  {items.map((item, index) => {
                    const sortCode = getShortCode(item.organization);
                    const isLast = index === items.length - 1;

                    return (
                      <div
                        key={index}
                        ref={isLast ? lastItemRef : null}
                        className="h-full"
                      >
                        {/* Make card take full height */}
                        <div className="flex flex-col h-full">
                          {renderItem(item, sortCode)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {hasMore && (
                  <div className="grid gap-3 sm:gap-6 lg:grid-cols-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <ProphytesSkeleton key={index} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProphytesInfiniteScroll;
