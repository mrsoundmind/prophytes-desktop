"use client";
import { useAllConnectionQuery } from "@/src/redux/services/connectionApi";
import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import ChatInput from "./ChatInput";
import { setgroupConversations } from "@/src/redux/slices/groupConversationsSlice";
import { useDispatch } from "react-redux";
import BackButton from "./BackButton";
import BottomNav from "@/components/header/BottomNav";
import { useConversationByRecieverQuery } from "@/src/redux/services/conversationApi";
import Chatting from "./Chatting";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";

export default function NewConversation() {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState([]);
  const [latestMsg, setLatestMsg] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [selectedfriend, setSelectedFriend] = useState(null);
  const [groupName, setGroupName] = useState("");
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [data, setData] = useState({});
  const [page, setPage] = useState(0);
  const [connectionsList, setConnectionsList] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const { debouncedFilters: friendFilters, setFilter: setFriendFilter } =
    useDebouncedQuery();

  const { data: conversation, isLoading: conversationLoading } =
    useConversationByRecieverQuery(
      {
        recieverId: selected[0]?.user?.id,
      },
      { skip: !selected[0]?.user?.id }
    );

  // ---- Infinite Scroll Data Fetch ----
  const {
    data: filtered,
    isFetching,
    isSuccess,
  } = useAllConnectionQuery({
    skip: page * 20,
    limit: 20,
    name: friendFilters.search,
  });

  useEffect(() => {
    if (filtered?.data?.connections) {
      setConnectionsList((prev) => {
        const newConnections = filtered.data.connections.filter(
          (newItem) => !prev.some((old) => old?.user?.id === newItem?.user?.id)
        );
        return [...prev, ...newConnections];
      });
      setHasMore(filtered.data.connections.length >= 20);
    }
  }, [filtered]);

  useEffect(() => {
    setPage(0);
    setConnectionsList([]);
  }, [friendFilters.search]);

  const handleScroll = useCallback(() => {
    const element = wrapperRef.current;
    if (!element || isFetching || !hasMore) return;

    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 20) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    const element = wrapperRef.current;
    if (element) element.addEventListener("scroll", handleScroll);
    return () => element && element.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setFriendFilter("search", inputValue);
  }, [inputValue]);

  const availableUsers = filtered?.data?.connections.filter(
    (user) => !selected.some((sel) => sel?.user?.id === user?.user?.id)
  );

  const handleSelect = (user) => {
    setSelected((prev) => {
      if (prev.some((u) => u?.user?.id === user?.user?.id)) return prev;
      return [...prev, user];
    });
    setInputValue("");
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleRemove = (id) => {
    setSelected((prev) => prev.filter((u) => u?.user?.id !== id));
    inputRef.current?.focus();
  };

  useEffect(() => {
    dispatch(setgroupConversations(selected));
    if (selected.length === 0) return;

    const userIds = selected.map((u) => u?.user?.id);
    const name =
      selected[0]?.user?.fullName +
      ", " +
      selected[1]?.user?.fullName +
      `${selected.length > 2 ? ` & ${selected.length - 2}` : ""}`;
    setData({ userIds, visibility: "PRIVATE" });
  }, [selected]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="text-white rounded-lg shadow-lg overflow-y-auto flex flex-col justify-between h-[calc(100vh-18vh)] xxs:h-[calc(100vh-12vh)] xss:h-[calc(100vh-10vh)] xs:h-[calc(100vh-9vh)] sm:h-[calc(100vh-150px)] md:h-[calc(100vh-190px)] lg:h-[calc(100vh-190px)] xl:h-[calc(100vh-130px)] 2xl:h-[calc(100vh-120px)] 3xl:h-[calc(100vh-125px)]">
      <div>
        <div className="flex sm:gap-0 gap-2 sm:py-6 py-4 bg-[#272727] sm:mt-0 mt-5 rounded-[10px] pl-5">
          <div className="block sm:hidden">
            <BackButton />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {selected.map((user) => (
              <div
                key={user?.user?.id}
                className="flex items-center gap-1 px-2 py-1 bg-[#171717] rounded-full"
              >
                <span className="text-sm text-white">
                  {user?.user?.fullName}
                </span>
                <button
                  className="text-white hover:text-red-500"
                  onClick={() => handleRemove(user?.user?.id)}
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="relative">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onFocus={() => setIsOpen(true)}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setIsOpen(true);
                  }}
                  placeholder="Search Friends..."
                  className="w-full placeholder:text-[15px] placeholder:text-white bg-[#272727] outline-none rounded-[10px] px-5"
                />

                {isOpen && (
                  <div
                    ref={wrapperRef}
                    className="absolute left-0 z-50 w-[300px] mt-1 overflow-y-auto bg-white rounded-lg shadow-lg max-h-[400px]"
                  >
                    {/* NEW LOGIC FOR NO DATA FOUND */}
                    {isFetching ? (
                      Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center px-3 py-2">
                          <div className="w-[40px] h-[40px] bg-gray-700 rounded-full animate-pulse" />
                          <div className="flex-1 ml-3 h-[15px] bg-gray-700 rounded animate-pulse"></div>
                        </div>
                      ))
                    ) : filtered?.data?.connections?.length === 0 ? (
                      <div className="p-3 text-sm text-center text-gray-500">
                        No data found
                      </div>
                    ) : (
                      availableUsers.map((user) => (
                        <div
                          key={user?.user?.id}
                          className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleSelect(user)}
                        >
                          <div className="h-9 w-9">
                            <img
                              src={user?.user?.avatar}
                              alt={user?.user?.fullName}
                              className="w-full h-full rounded-full"
                            />
                          </div>
                          <span className="text-black">
                            {user?.user?.fullName}
                          </span>
                        </div>
                      ))
                    )}

                    {isFetching && filtered?.data?.connections?.length > 0 && (
                      <div className="p-3 text-sm text-center text-gray-500">
                        Loading more...
                      </div>
                    )}

                    {!hasMore && filtered?.data?.connections?.length > 0 && (
                      <div className="p-3 text-xs text-center text-gray-400">
                        No more results
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Group preview */}
        <div className="px-3 sm:px-0">
          {selected.length > 0 && (
            <>
              <div className="flex flex-col items-center text-white">
                <div className="flex flex-col items-center">
                  <div className="relative flex -space-x-4">
                    {(selected.length > 2
                      ? selected
                          .slice()
                          .sort(() => 0.5 - Math.random())
                          .slice(0, 2)
                      : selected
                    ).map((user, idx) => (
                      <img
                        key={idx}
                        src={user?.user?.avatar}
                        alt={user?.user?.fullName}
                        width={48}
                        height={48}
                        className="w-12 h-12 border-2 border-white rounded-full"
                      />
                    ))}
                  </div>

                  <h5 className="mt-3 text-base font-semibold font-montserrat">
                    {groupName
                      ? groupName
                      : (() => {
                          const names = selected.map((u) => {
                            const fullName = u?.user?.fullName || "";
                            return selected.length > 2
                              ? fullName.split(" ")[0]
                              : fullName;
                          });
                          const limited =
                            names.length > 5
                              ? [...names.slice(0, 5), "other..."]
                              : names;
                          return limited.join(", ");
                        })()}
                  </h5>
                </div>
              </div>

              <div>
                {conversation?.data?.conversation?.id &&
                  selected.length === 1 && (
                    <div className="px-0 sm:px-5">
                      <Suspense fallback={<div>Loading...</div>}>
                        <Chatting
                          id={conversation?.data?.conversation?.id}
                          showHeaer={false}
                        />
                      </Suspense>
                    </div>
                  )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <div>
        {!conversation?.data?.conversation?.id && selected.length === 1 && (
          <div className="px-0 sm:px-5">
            <ChatInput
              receiverId={selected[0]?.user?.id}
              conversationType={"DIRECT"}
              setLatestMsg={setLatestMsg}
              isNewChat={true}
            />
          </div>
        )}

        {selected.length > 1 && (
          <div className="px-0 sm:px-5">
            <ChatInput
              isNewGroup={true}
              data={data}
              conversationType={"GROUP"}
            />
          </div>
        )}

        <div className="fixed bottom-0 left-0 z-50 block w-full sm:hidden">
          {selected.length === 0 && <BottomNav />}
        </div>
      </div>
    </div>
  );
}
