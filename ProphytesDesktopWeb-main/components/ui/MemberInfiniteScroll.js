import { Suspense, useCallback, useRef, useState } from "react";
import MemberSkeleton from "../skeleton/MemberSkeleton";
import MemberFilter from "./MemberFilter";

const MemberInfiniteScroll = ({
  items,
  hasMore,
  loadMore,
  renderItem,
  loader,
}) => {
  const observer = useRef();
  const [filterItem, setFilterItem] = useState(true);

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
    <div className="min-h-screen bg-[#141616]  md:py-[140px] xs:py-20  py-[60px]">
      <div className="container">
        {/* Filter */}
        <Suspense fallback={<div>Loading...</div>}>
          <MemberFilter filterItem={filterItem} setFilterItem={setFilterItem} />
        </Suspense>

        {/* Content */}
        <>
          {loader && items.length === 0 ? (
            // Initial loading state
            <div className="grid gap-4 mt-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <MemberSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div>
              {filterItem && (
                <div className="">
                  <div className="grid gap-4 mt-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                    {items.map((item, index) => {
                      const isLast = index === items.length - 1;
                      return (
                        <div key={index} ref={isLast ? lastItemRef : null}>
                          {renderItem(item, index)}
                        </div>
                      );
                    })}
                  </div>

                  {hasMore && (
                    <div className="">
                      <div className="grid gap-5 mt-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                        {Array.from({ length: 8 }).map((_, index) => (
                          <MemberSkeleton key={index} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default MemberInfiniteScroll;
