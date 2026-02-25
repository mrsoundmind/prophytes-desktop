import { useAllConnectionQuery } from "@/src/redux/services/connectionApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { useLazyConversationByRecieverQuery } from "@/src/redux/services/conversationApi";
import {
  setIsMobile,
  setShowChatFriendList,
} from "@/src/redux/slices/chatSlice";
import { setActiveIndex } from "@/src/redux/slices/conversationSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ConnectionRequest from "./ConnectionRequest";
import { organizations } from "@/src/configs/constants";

const FriendsConversation = ({ name, pathname, setActiveTab, activeTab }) => {
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const [page, setPage] = useState(0);
  const [connectionsData, setConnectionsData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const userId = userInfo?.user?.id;
  const organizationId = userInfo?.user?.organizationId;

  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const getColorById = () => {
    const org = organizations.find((item) => item.id === organizationId);
    return org?.color || null;
  };

  const {
    data: connections,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useAllConnectionQuery(
    {
      skip: page * 20,
      limit: 20,
      name: name,
    },
    { skip: !hasMore }
  );

  const newNotification = useSelector(
    (state) => state.notification.notification
  );
  const [fetchConversation, { data, isLoading: loading }] =
    useLazyConversationByRecieverQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile, showChatFriendList } = useSelector((state) => state.chat);
  const { activeIndex } = useSelector((state) => state.conversation);

  // Reset pagination when search term changes
  useEffect(() => {
    setPage(0);
    setConnectionsData([]);
    setHasMore(true);
  }, [name]);

  // Handle new data from API
  useEffect(() => {
    if (connections?.data?.connections) {
      if (page === 0) {
        setConnectionsData(connections.data.connections);
      } else {
        const container = containerRef.current;
        const scrollPosition = container?.scrollTop;
        setConnectionsData((prev) => [
          ...prev,
          ...connections.data.connections,
        ]);
        if (container && scrollPosition) {
          requestAnimationFrame(() => {
            container.scrollTop = scrollPosition;
          });
        }
      }
      setHasMore(connections.data.connections.length >= 20);
      setIsLoadingMore(false);
    }
  }, [connections, page]);

  // Scroll event handler
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoadingMore || !hasMore || isFetching)
      return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollHeight - scrollTop - clientHeight <= 150) {
      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [isLoadingMore, hasMore, isFetching]);

  const throttledScrollHandler = useCallback(() => {
    if (scrollTimeoutRef.current) return;
    scrollTimeoutRef.current = setTimeout(() => {
      handleScroll();
      scrollTimeoutRef.current = null;
    }, 50);
  }, [handleScroll]);

  // Scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", throttledScrollHandler);
    return () =>
      container.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  // useEffect(() => {
  //   if (pathname === "/chat/request") {
  //     setActiveTab("All");
  //   } else {
  //     setActiveTab("Connects");
  //   }
  // }, [pathname, setActiveTab]);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 640));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const handleNavigate = async (userId) => {
    const conversations = await fetchConversation({ recieverId: userId });
    if (conversations?.data?.data?.conversation?.id) {
      router.push(
        `/chat/${conversations?.data?.data?.conversation?.id}?type=${conversations?.data?.data?.conversation?.type}`
      );
      if (isMobile) dispatch(setShowChatFriendList(!showChatFriendList));
    } else {
      router.push(`/chat/newchat-${userInfo?.user?.id}-${userId}`);
      if (isMobile) dispatch(setShowChatFriendList(!showChatFriendList));
      dispatch(setActiveIndex("All"));
    }
  };

  useEffect(() => {
    if (newNotification && newNotification.type === "CONNECTION_ACCEPTED") {
      setPage(0);
      setConnectionsData([]);
      setHasMore(true);
      refetch();
    }
  }, [newNotification, refetch]);

  if (isLoading && page === 0) {
    return Array.from({ length: 7 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center px-3 py-2 transition-all duration-500 ease-in-out rounded-lg"
      >
        <div className="relative flex items-center justify-center w-[50px] h-[50px] overflow-hidden border-2 border-white rounded-full animate-pulse bg-gray-700" />
        <div className="flex-1 ml-3">
          <div className="h-[20px] w-32 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    ));
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto custom-scrollbar-x"
    >
      {pathname === "/chat/request" ? (
        <ConnectionRequest userId={userId} orgColor={getColorById()} />
      ) : (
        <div>
          {connectionsData.map((user, index) => (
            <div
              key={`${index}`}
              className="flex items-center px-3 py-2 hover:bg-[#1a1a1a] transition-all duration-500 ease-in-out rounded-lg cursor-pointer"
              onClick={() => handleNavigate(user?.user?.id)}
            >
              <div className="relative flex items-center justify-center w-[50px] h-[50px] overflow-hidden border-2 border-white rounded-full">
                <Image
                  src={user?.user?.avatar}
                  height={50}
                  width={50}
                  alt={user?.user?.fullName}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="flex-1 ml-3">
                <h4 className="2xl:text-lg text-[15px] font-bold text-white leading-[30px] line-clamp-1">
                  {user?.user?.fullName}
                </h4>
              </div>
            </div>
          ))}

          {(isLoadingMore || isFetching) &&
            page > 0 &&
            Array.from({ length: 7 }).map((_, index) => (
              <div
                key={`loading-${index}`}
                className="flex items-center px-3 py-2 transition-all duration-500 ease-in-out rounded-lg"
              >
                <div className="relative flex items-center justify-center w-[50px] h-[50px] overflow-hidden border-2 border-white rounded-full animate-pulse bg-gray-700" />
                <div className="flex-1 ml-3">
                  <div className="h-[20px] w-32 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}

          {!isLoading && connectionsData.length === 0 && (
            <div className="py-8 text-center">
              <span className="text-gray-400">No connections found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendsConversation;
