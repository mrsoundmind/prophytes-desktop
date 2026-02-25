import { Suspense, useCallback, useRef, useState } from "react";
import ChapterSkeleton from "../skeleton/ChapterSkeleton";
import ChapterFilter from "./ChapterFilter";

const InfiniteScroll = ({ items, hasMore, loadMore, renderItem, loader }) => {
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
    <div className="min-h-screen py-20 bg-black">
      <div className="container">
        {/* Filter */}
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <ChapterFilter
              filterItem={filterItem}
              setFilterItem={setFilterItem}
            />
          </Suspense>
        </div>

        {/* Loading Placeholder for Initial Load */}
        {loader && items.length === 0 ? (
          <div className="grid gap-x-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <ChapterSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div>
            {filterItem && (
              <div>
                <div className="grid items-stretch gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                  {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                      <div
                        className="h-full"
                        key={index}
                        ref={isLast ? lastItemRef : null}
                      >
                        {renderItem(item, index)}
                      </div>
                    );
                  })}
                </div>

                {hasMore && (
                  <div className="grid gap-x-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <ChapterSkeleton key={index} />
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

export default InfiniteScroll;
