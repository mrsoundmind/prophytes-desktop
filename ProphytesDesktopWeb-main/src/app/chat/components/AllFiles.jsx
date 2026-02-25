"use client";

import ImageSvg from "@/public/img/icon/ImageSvg";
import { useConversationAttachmentsQuery } from "@/src/redux/services/conversationApi";
import { formatDate } from "@/src/utils/formatDate";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useRef, useCallback, useState } from "react";
import Imageicon from "@/public/img/icon/Imageicon";
import DocumentSvg from "@/public/img/icon/DocumentSvg";
import VideoSvg from "@/public/img/icon/VideoSvg";

export default function AllFiles({ conversationId }) {
  const { activeIndex } = useSelector((state) => state.conversation);
  const [page, setPage] = useState(0);
  const [allAttachments, setAllAttachments] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const limit = 20; // Number of items to load per page

  const {
    data: attachments,
    isLoading,
    isFetching,
  } = useConversationAttachmentsQuery(
    {
      conversationId,
      skip: page * limit,
      limit,
      type: activeIndex,
    },
    {
      skip: activeIndex === "All" || !hasMore,
    }
  );

  // Reset state when filters change
  useEffect(() => {
    setPage(0);
    setAllAttachments([]);
    setHasMore(true);
  }, [activeIndex, conversationId]);

  // Update allAttachments when new data is fetched
  useEffect(() => {
    if (attachments?.data?.attachments) {
      if (attachments.data.attachments.length === 0) {
        setHasMore(false);
      } else {
        setAllAttachments((prev) => [...prev, ...attachments.data.attachments]);
      }
    }
  }, [attachments]);

  // Infinite scroll implementation
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, hasMore]
  );

  const icons = {
    IMAGE: <Imageicon />,
    DOCUMENT: <DocumentSvg />,
    default: <VideoSvg />,
  };

  // Show loading state for initial load
  if (isLoading && allAttachments.length === 0) {
    return (
      <div className="px-3 py-4">
        <div className="overflow-hidden border border-gray-700 rounded-lg">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-sm text-gray-400 uppercase bg-gray-800">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Shared on</th>
                <th className="px-4 py-3">Sent by</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr
                  key={index}
                  className="transition-all duration-500 ease-in-out border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="flex items-center gap-5 px-4 py-3">
                    <div className="w-6 h-6 bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-[200px] bg-gray-700 rounded animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-[80px] bg-gray-700 rounded animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-[120px] bg-gray-700 rounded animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const getIcon = (type) => icons[type] || icons.default;

  return (
    <div className="px-3 py-4">
      <>
        {allAttachments.length > 0 ? (
          <div className="border border-gray-700 rounded-lg ">
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full text-sm text-left text-gray-300">
                <thead className="text-sm text-gray-400 uppercase bg-gray-800">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Shared on</th>
                    <th className="px-4 py-3">Sent by</th>
                  </tr>
                </thead>
                <tbody>
                  {allAttachments.map((file, index) => {
                    if (allAttachments.length === index + 1) {
                      return (
                        <tr
                          ref={lastElementRef}
                          key={index}
                          className="transition-all duration-500 ease-in-out border-b border-gray-700 hover:bg-gray-800"
                        >
                          <td className="flex items-center gap-5 px-4 py-3 whitespace-nowrap">
                            {getIcon(file.type)}
                            <Link
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate max-w-[300px] text-white hover:underline"
                            >
                              {file.fileName}
                            </Link>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {formatDate(file.createdAt)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {file.sender}
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr
                          key={index}
                          className="transition-all duration-500 ease-in-out border-b border-gray-700 hover:bg-gray-800"
                        >
                          <td className="flex items-center gap-5 px-4 py-3 whitespace-nowrap">
                            {getIcon(file.type)}
                            <Link
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate max-w-[300px] text-white hover:underline"
                            >
                              {file.fileName}
                            </Link>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {formatDate(file.createdAt)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {file.sender}
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>

            {/* Show loading indicator when fetching more data */}
            {isFetching && isLoading && (
              <div>
                {[...Array(10)].map((_, index) => (
                  <tr
                    key={index}
                    className="transition-all duration-500 ease-in-out border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="flex items-center gap-5 px-4 py-3">
                      <div className="w-6 h-6 bg-gray-700 rounded animate-pulse" />
                      <div className="h-4 w-[200px] bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-[80px] bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-[120px] bg-gray-700 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </div>
            )}

            {/* Show empty state if no files */}
          </div>
        ) : (
          <div className="h-full">
            {allAttachments.length === 0 && !isLoading && (
              <h4 className="flex items-center justify-center h-full sm:mt-[28%] mt-[60%] text-xl font-semibold text-center text-white">
                No Files Found!
              </h4>
            )}
          </div>
        )}
      </>
    </div>
  );
}
