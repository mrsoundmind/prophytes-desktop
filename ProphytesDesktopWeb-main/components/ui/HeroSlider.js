import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MemberDirectorySkeleton from "../skeleton/MemberDirectorySkeleton";
import { useRouter } from "next/navigation";
import DirectorySvg from "@/public/img/icon/DirectorySvg";
import AngleRight from "@/public/img/icon/AngleRight";
import Link from "next/link";
import { useUserInfoQuery } from "@/src/redux/services/userApi";

const HeroSlider = ({ data, loading, anim }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const sliderRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const route = useRouter();

  const { data: userInfo, isLoading } = useUserInfoQuery();

  const handleMouseDown = (e) => {
    isDownRef.current = true;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const createInfiniteData = () => {
    if (!data?.data?.length) return [];
    const copies = [];
    for (let i = 0; i < 5; i++) {
      copies.push(...data.data);
    }
    return copies;
  };

  const infiniteData = createInfiniteData();

  useEffect(() => {
    const images = sliderRef.current?.querySelectorAll("img") || [];
    let loadedCount = 0;

    const checkImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = checkImageLoad;
        img.onerror = checkImageLoad;
      }
    });

    if (loadedCount === images.length) {
      setImagesLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !imagesLoaded || !data?.data?.length) return;

    const itemWidth = 220 + 16;
    const totalOriginalWidth = data.data.length * itemWidth;
    slider.scrollLeft = totalOriginalWidth * 2;

    const onScroll = () => {
      const currentScrollLeft = slider.scrollLeft;
      if (currentScrollLeft >= totalOriginalWidth * 4) {
        slider.scrollLeft = totalOriginalWidth * 2;
      } else if (currentScrollLeft <= totalOriginalWidth) {
        slider.scrollLeft = totalOriginalWidth * 3;
      }
    };

    slider.addEventListener("scroll", onScroll, { passive: true });
    return () => slider.removeEventListener("scroll", onScroll);
  }, [imagesLoaded, data]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !imagesLoaded) return;

    let isPaused = false;
    let isUserInteracting = false;
    let animationFrameId;

    const scrollSpeed = 0.02;

    const scroll = () => {
      if (!isPaused && !isUserInteracting) {
        slider.scrollLeft += scrollSpeed;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const startInteraction = () => {
      isUserInteracting = true;
      isPaused = true;
    };

    const endInteraction = () => {
      isUserInteracting = false;
      setTimeout(() => {
        if (!isUserInteracting) isPaused = false;
      }, 1000);
    };

    slider.addEventListener("mouseenter", () => (isPaused = true));
    slider.addEventListener("mouseleave", () => {
      if (!isUserInteracting) isPaused = false;
    });
    slider.addEventListener("mousedown", startInteraction);
    slider.addEventListener("mouseup", endInteraction);
    slider.addEventListener("touchstart", startInteraction, { passive: true });
    slider.addEventListener("touchend", endInteraction);

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      slider.removeEventListener("mouseenter", () => (isPaused = true));
      slider.removeEventListener("mouseleave", () => {
        if (!isUserInteracting) isPaused = false;
      });
      slider.removeEventListener("mousedown", startInteraction);
      slider.removeEventListener("mouseup", endInteraction);
      slider.removeEventListener("touchstart", startInteraction);
      slider.removeEventListener("touchend", endInteraction);
    };
  }, [imagesLoaded]);

  const handleClick = (id) => {
    route.push(`/members/${id}`);
  };

  const handleScroll = () => {
    const section = document.getElementById("section2");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);

        // clear previous timeout if still running
        if (scrollTimeout) clearTimeout(scrollTimeout);

        // hide after pause (e.g., 800ms no scroll)
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, 2000);

        setScrollTimeout(timeout);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollTimeout]);

  return (
    <div className="relative block xl:hidden">
      {loading ? (
        <div className="flex pb-5 my-2">
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <MemberDirectorySkeleton key={i} />
            ))}
        </div>
      ) : (
        <div
          ref={sliderRef}
          className="pb-20 overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ scrollBehavior: "auto", transition: "none" }}
        >
          <div className={`flex w-max ${anim}`}>
            {infiniteData.map((item, i) => (
              <div
                key={i}
                className="w-[180px] flex-col rounded-[40px] p-5 text-white shadow-lg transition-transform hover:z-[999] duration-500 ease-in-out cursor-pointer"
                onClick={() => handleClick(item?.id)}
                style={{
                  backgroundColor:
                    item.organization?.name === "Alpha Phi Alpha"
                      ? `#CFB53B`
                      : `#${item.organization.color}`,
                  marginLeft: i === 0 ? 0 : -40,
                }}
              >
                {/* Avatar */}
                <div className="relative w-14 h-14">
                  <Image
                    src={item.avatar}
                    alt={item.firstName}
                    width={48}
                    height={48}
                    className="w-full h-full border-4 rounded-full border-white/20"
                  />
                  {/* Badge */}
                  <div
                    className="w-6 h-6 absolute top-3 -right-3 flex items-center justify-center rounded-full border-white border-[2px] bg-[#16AD4B]"
                    style={{
                      backgroundColor: item?.isPaid
                        ? `#${item?.organization?.color}`
                        : "#16AD4B",
                    }}
                  >
                    <DirectorySvg />
                  </div>
                </div>

                {/* Name */}
                <p className="mt-2 text-base font-medium leading-6 text-left text-white sm:leading-7 sm:text-lg">
                  {item.firstName}
                </p>

                {/* Organization */}
                <p className="mt-1 text-[12px] text-left leading-[18px] text-white">
                  {item?.organization?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky button */}
      {!userInfo?.user && !isLoading && (
        <Link
          href="/onboard"
          className={`group fixed bottom-6 left-1/2 -translate-x-1/2
    z-[9999] inline-flex xs:gap-[18px] gap-[10px] items-center border border-white/10 
    h-[66px] overflow-hidden bg-black rounded-[99px]  p-[2px] transition-all duration-700 ease-in cursor-pointer
    after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0 after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black
    xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms]
    after:border-0 group-hover:after:border-white
    after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto
    ${
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-5 pointer-events-none"
    }`}
        >
          <span className="w-[197px] py-[14px] ml-[5px] bg-white text-base font-medium text-black leading-[26px] rounded-[99px]">
            <span className="relative pl-3 z-[9] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
              Claim my prophytes #
            </span>
          </span>

          <span className="pr-3 mt-2">
            <AngleRight className="text-white group-hover:text-white relative z-[99] xs:size-6 size-6 transition-all duration-500 ease-out" />
          </span>
        </Link>
      )}
    </div>
  );
};

export default HeroSlider;
