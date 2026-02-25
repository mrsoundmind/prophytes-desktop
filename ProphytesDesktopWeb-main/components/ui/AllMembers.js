"use client";
import { useEffect, useState } from "react";

import config from "@/config";
import MemberCard from "./MemberCard";
import MemberInfiniteScroll from "./MemberInfiniteScroll";

const AllMember = () => {
  const [members, setMembers] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 12;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchMembers = async () => {
      if (loading || !hasMore) return;
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const res = await fetch(
          `${config.apiBaseUrl}/desktop/members?skip=${skip}&limit=${limit}`
        );
        const data = await res.json();

        if (!isMounted) return;

        if (data?.users?.length > 0) {
          setMembers((prev) => [...prev, ...data.users]);
          setSkip((prev) => prev + limit);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.warn("⚠️ [AllMembers] Error fetching members (expected if backend offline):", error);
        setHasMore(false); // Stop infinite loading on error
      }

      setLoading(false);
    };

    fetchMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  const fetchMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const res = await fetch(
      `${config.apiBaseUrl}/desktop/members?skip=${skip}&limit=${limit}`
    );
    const data = await res.json();

    if (data?.users?.length > 0) {
      setMembers((prev) => [...prev, ...data.users]);
      setSkip((prev) => prev + limit);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  return (
    <div>
      <MemberInfiniteScroll
        items={members}
        hasMore={hasMore}
        loadMore={fetchMore}
        loader={loading}
        renderItem={(item) => <MemberCard member={item} />}
      />
    </div>
  );
};

export default AllMember;
