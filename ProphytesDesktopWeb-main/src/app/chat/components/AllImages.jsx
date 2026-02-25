"use client";
import { useConversationAttachmentsQuery } from "@/src/redux/services/conversationApi";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";

const AllImages = ({ conversationId }) => {
  const { activeIndex } = useSelector((state) => state.conversation);
  const [page, setPage] = useState(0);
  const [allImages, setAllImages] = useState([]);
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
    setAllImages([]);
    setHasMore(true);
  }, [activeIndex, conversationId]);

  // Update allImages when new data is fetched
  useEffect(() => {
    if (attachments?.data?.attachments) {
      if (attachments.data.attachments.length === 0) {
        setHasMore(false);
      } else {
        setAllImages((prev) => [...prev, ...attachments.data.attachments]);
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

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleWheel = (e) => {
    e.preventDefault();
    setZoom((z) => Math.max(1, z + (e.deltaY > 0 ? -0.1 : 0.1)));
  };

  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setDragging(true);
    setStartPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setOffset({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-3 sm:grid-cols-2">
        {isLoading && allImages.length === 0
          ? [...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-full h-[250px] rounded-[8px] bg-gray-400 animate-pulse"
              />
            ))
          : allImages.map((file, i) => {
              // Add ref to the last element for infinite scroll
              if (allImages.length === i + 1) {
                return (
                  <div
                    ref={lastElementRef}
                    key={i}
                    className="w-full h-[250px] cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(i);
                      setIsOpen(true);
                      setZoom(1);
                      setOffset({ x: 0, y: 0 });
                    }}
                  >
                    <Image
                      src={file?.url}
                      height={200}
                      width={300}
                      alt={file?.fileName}
                      className="w-full h-full rounded-[8px] object-cover"
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    className="w-full h-[250px] cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(i);
                      setIsOpen(true);
                      setZoom(1);
                      setOffset({ x: 0, y: 0 });
                    }}
                  >
                    <Image
                      src={file?.url}
                      height={200}
                      width={300}
                      alt={file?.fileName}
                      className="w-full h-full rounded-[8px] object-cover"
                    />
                  </div>
                );
              }
            })}
      </div>

      {/* Show loading indicator when fetching more data */}
      {isFetching && (
        <div className="grid gap-4 mt-4 lg:grid-cols-3 sm:grid-cols-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={`loading-${i}`}
              className="w-full h-[250px] rounded-[8px] bg-gray-400 animate-pulse"
            />
          ))}
        </div>
      )}

      <div className="h-full">
        {allImages.length === 0 && !isLoading && (
          <h4 className="flex items-center justify-center h-full sm:mt-[28%] mt-[60%] text-xl font-semibold text-center text-white">
            No Image Found!
          </h4>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black "
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Close button */}
          <button
            className="absolute text-3xl text-white top-4 right-4"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <button
            className="absolute text-3xl text-white left-4 z-[9999]"
            onClick={() =>
              setCurrentIndex((i) => (i > 0 ? i - 1 : allImages.length - 1))
            }
          >
            ‹
          </button>

          <button
            className="absolute text-3xl text-white right-4 z-[9999]"
            onClick={() =>
              setCurrentIndex((i) => (i < allImages.length - 1 ? i + 1 : 0))
            }
          >
            ›
          </button>

          {/* Image */}
          <div
            className=" w-[90%] h-[90vh] overflow-hidden flex items-center justify-center"
            onMouseDown={handleMouseDown}
          >
            <img
              src={allImages[currentIndex]?.url}
              alt={allImages[currentIndex]?.fileName}
              className="transition-transform duration-150"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                cursor: zoom > 1 ? "grab" : "zoom-in",
              }}
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllImages;
