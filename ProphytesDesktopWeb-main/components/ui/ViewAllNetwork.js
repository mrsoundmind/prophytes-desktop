"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Cityicon from "@/public/img/icon/Cityicon";
import MessageSvg from "@/public/img/icon/MessageSvg";
import Searchicon from "@/public/img/icon/Searchicon";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import { useLazyGetConnectionStatusQuery } from "@/src/redux/services/connectionApi";
import { useLazyConversationByRecieverQuery } from "@/src/redux/services/conversationApi";
import {
  useGetMemberByIdQuery,
  useGetMembersQuery,
} from "@/src/redux/services/memberApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { faAngleDown, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrgNetworkButtonSkeleton from "../skeleton/OrgNetworkButtonSkeleton";
import OrgNetworkSkeleton from "../skeleton/OrgNetworkSkeleton";
import ClaimButton from "./ClaimButton";
import AngleBottom from "@/public/img/icon/AngleBottom";

export default function ViewAllNetworkModal({ orgId, isPremium }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allMembers, setAllMembers] = useState([]);

  const wrapperRef = useRef(null);
  const scrollRef = useRef(null);
  const params = useParams();

  const router = useRouter();
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const [isUserPremium, setIsPremium] = useState(false);
  const [
    fetchConnection,
    { data: memberConnection, isLoading: memberConnectionLoading },
  ] = useLazyGetConnectionStatusQuery();
  const [fetchConv, { data: conversation, isLoading: conversationLoading }] =
    useLazyConversationByRecieverQuery({});

  const { data: member, isLoading: loading } = useGetMemberByIdQuery(
    params?.id
  );

  const { debouncedFilters: membersFilters, setFilter: setMemberFilter } =
    useDebouncedQuery();

  const handleChat = async ({ memberId }) => {
    userInfo?.user ? "" : router.push("/signin");

    const conversation = await fetchConv({ recieverId: memberId });
    const connection = await fetchConnection(memberId);
    console.log("conversation", conversation);
    const isConnected =
      connection && connection?.data?.data?.connection?.status === "connect"
        ? true
        : false;

    if (conversation?.data?.data?.conversation?.id) {
      router.push(
        `/chat/${conversation?.data?.data?.conversation?.id}?type=${conversation?.data?.data?.conversation?.type}`
      );
    } else {
      if (isUserPremium) {
        router.push(`/chat/newchat-${userInfo?.user?.id}-${memberId}`);
      } else {
        if (isConnected) {
          router.push(`/chat/newchat-${userInfo?.user?.id}-${memberId}`);
        } else {
          ErrorAlert("You are not connected to this member");
        }
      }
    }
  };

  useEffect(() => {
    setPage(1);
    setAllMembers([]);
    setHasMore(true);
  }, [membersFilters.search]);

  useEffect(() => {
    setMemberFilter("search", inputValue);
  }, [inputValue]);

  const {
    data: members,
    isLoading,
    isFetching,
  } = useGetMembersQuery({
    search: membersFilters.search,
    orgId,
    page,
    limit: 10,
  });

  useEffect(() => {
    if (members?.users?.length > 0) {
      setAllMembers((prev) => {
        const existingIds = new Set(prev.map((u) => u.id));
        const newUsers = members.users.filter((u) => !existingIds.has(u.id));
        return page === 1 ? members.users : [...prev, ...newUsers];
      });

      if (members.users.length < 10) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  }, [members]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleScroll = (e) => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (userInfo?.user?.isPaid) {
      setIsPremium(true);
    }
  }, [userInfo]);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <div>
        {loading ? (
          <OrgNetworkButtonSkeleton />
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex justify-between items-center text-[16px] font-semibold w-full text-start ${" text-white"}`}
          >
            <span>View All Network</span>
            <button className="grid place-content-center w-8 h-8 bg-black rounded-[6px] border border-[#383838]">
              <AngleBottom />
            </button>
          </button>
        )}
      </div>

      {isOpen && (
        <>
          {/* Mobile Modal */}
          <div
            className="fixed z-[1001] p-5 bg-white shadow-lg rounded-xl w-[90%] max-w-[400px]
            left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block md:hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">
                Organization Network
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[26px] font-medium text-black"
              >
                x
              </button>
            </div>

            <p className="mb-4 text-base text-[#333333]">
              Browse and connect with members of the organization.
            </p>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search.."
                className="w-full py-3 pl-4 pr-10 bg-gray-100 text-[#333333] rounded-full focus:outline-none placeholder:text-base text-base"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <span className="absolute top-3 right-5">
                <Searchicon />
              </span>
            </div>

            <div
              ref={scrollRef}
              className="space-y-5 max-h-[360px] overflow-y-auto"
              onScroll={handleScroll}
            >
              {isFetching && page === 1 ? (
                <OrgNetworkSkeleton />
              ) : allMembers.length === 0 ? (
                <ClaimButton title="Claim Membership" isBorder={false} />
              ) : (
                allMembers.map((member, index) => (
                  <div
                    key={member.id || index}
                    className="flex items-center gap-[17px] border-2  "
                  >
                    <Image
                      src={member?.avatar || "/img/dummy-user.png"}
                      height={40}
                      width={40}
                      alt={member?.firstName}
                      className="w-10 h-10 sm:w-[56px] sm:h-[56px] rounded-full"
                    />
                    <div>
                      <h4 className="text-sm sm:text-lg font-medium text-[#121417] leading-6">
                        {member?.firstName} {member?.lastName}
                      </h4>
                      <p className="flex items-center gap-2 text-sm text-[#333333]">
                        <Cityicon />
                        {member?.cityName || "N/A"}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isFetching && page > 1 && allMembers.length > 0 && (
                <OrgNetworkSkeleton />
              )}
            </div>
          </div>

          {/* Desktop Modal */}
          <div
            className="absolute z-[1001] p-5 bg-[#141615] shadow-lg rounded-xl w-[300px] sm:w-[400px]
            hidden md:block sm:left-[100%] sm:top-3 sm:ml-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                Organization Network
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xl text-white"
              >
                X
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search.."
                className="w-full py-3 pl-4 pr-10 bg-black text-[#FFFFFFB2] rounded-xl focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <span className="absolute top-3 right-5">
                <Searchicon />
              </span>
            </div>

            <div
              ref={scrollRef}
              className="space-y-5 max-h-[350px] overflow-y-auto scrollbar-hide "
              onScroll={handleScroll}
            >
              {isFetching && page === 1 ? (
                <OrgNetworkSkeleton />
              ) : allMembers.length === 0 ? (
                <ClaimButton title="Claim Membership" isBorder={false} />
              ) : (
                allMembers.map((member, index) => (
                  <div
                    className="flex items-center justify-between "
                    key={member.id || index}
                  >
                    <div className="flex items-center gap-[17px]">
                      <div className="border-[3px] rounded-full border-white/20">
                        <Image
                          src={member?.avatar || "/img/dummy-user.png"}
                          height={40}
                          width={40}
                          alt={member?.firstName}
                          className="w-10 h-10 sm:w-[56px] sm:h-[56px] rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-lg font-medium text-[#FFFFFFB2] leading-6">
                          {member?.firstName} {member?.lastName}
                        </h4>
                        <p className="flex items-center gap-2 text-sm text-[#FFFFFFB2]">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-white"
                          />
                          {member?.cityName || "N/A"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleChat({ memberId: member?.id })}
                    >
                      <MessageSvg
                        className={`z-[999] relative text-white w-8 h-8 cursor-pointer`}
                      />
                    </button>
                  </div>
                ))
              )}
              {isFetching && page > 1 && allMembers.length > 0 && (
                <OrgNetworkSkeleton />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
