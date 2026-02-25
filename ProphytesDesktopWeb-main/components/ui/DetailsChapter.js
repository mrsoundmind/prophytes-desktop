"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "./InfiniteScroll ";

import config from "@/config";
import ChapterFilterContent from "./ChapterFilterContent";

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 12;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchChapters = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    // delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(
      `${config.apiBaseUrl}/desktop/chapters?skip=${skip}&limit=${limit}`
    );
    const data = await res.json();

    if (data?.chapters?.length > 0) {
      setChapters((prev) => [...prev, ...data.chapters]);
      setSkip((prev) => prev + limit);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <div>
      <InfiniteScroll
        items={chapters}
        hasMore={hasMore}
        loadMore={fetchChapters}
        loader={loading}
        renderItem={(item) => <ChapterFilterContent item={item} />}
      />
    </div>
  );
};

export default Chapters;
