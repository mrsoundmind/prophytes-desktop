"use client";
import { useEffect, useState } from "react";

import ProphytesInfiniteScroll from "./ProphytesInfiniteScroll";
import PropytesContent from "./PropytesContent";
import { useGetProphytesQuery } from "@/src/redux/services/prophytesApi";

const AllProphytes = () => {
  const [prophytes, setProphytes] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 6;
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching, isLoading } = useGetProphytesQuery({
    skip,
    limit,
  });

  useEffect(() => {
    if (data?.data?.length > 0) {
      setProphytes((prev) => [...prev, ...data.data]);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [data]);

  const fetchMore = () => {
    if (!isFetching && hasMore) {
      setSkip((prev) => prev + limit);
    }
  };

  return (
    <ProphytesInfiniteScroll
      items={prophytes}
      hasMore={hasMore}
      loadMore={fetchMore}
      loader={isLoading || isFetching}
      renderItem={(item, sortCode) => (
        <PropytesContent key={item.id} prophyte={item} sortCode={sortCode} />
      )}
    />
  );
};

export default AllProphytes;
