"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import { API_ROUTES } from "@/src/configs/constants";
import ChapterSkeleton from "../skeleton/ChapterSkeleton";
import ChapterFilterContent from "./ChapterFilterContent";

import { useGetAllOrganizationsQuery } from "@/src/redux/services/organizationApi";
import CustomSelect from "./CustomSelect";
import SchoolSelect from "./SchoolSelect";
import LocationSelect from "./LocationSelect";

const ChapterFilter = ({ setFilterItem }) => {
  const searchParams = useSearchParams();
  const chapter = searchParams.get("chapter") || "";
  const school = searchParams.get("school") || "";

  const qigPage = searchParams.get("igPage") || "";
  const organization = searchParams.get("organization" || "");
  const location = searchParams.get("location" || "");

  const [selectedChapter, setSelectedChapter] = useState(chapter);
  const [selectedSchool, setSelectedSchool] = useState(school);
  const [selectedCity, setSelectedCity] = useState(location);
  const [igPage, setIgPage] = useState(qigPage);
  const [chaptersData, setChaptersData] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedOrga, setSelectedOrga] = useState(organization);
  const [hasMore, setHasMore] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [searchParamsUrl, setSearchParamsUrl] = useState("");
  const limit = 12;
  const observer = useRef(null);

  // Debounced search terms for school, city, and chapter (for dropdown search only)
  const { debouncedFilters: citiesFilters, setFilter: setCitiesFilter } =
    useDebouncedQuery();
  const { debouncedFilters: schoolFilters, setFilter: setSchoolFilter } =
    useDebouncedQuery();
  const { debouncedFilters: chapterFilters, setFilter: setChapterFilter } =
    useDebouncedQuery();

  // Fetch universities and cities (for dropdowns)
  const { data: orgs, isLoading, error } = useGetAllOrganizationsQuery();

  // Build API URL with query parameters
  const buildApiUrl = (page = 0) => {
    const params = new URLSearchParams();
    if (selectedChapter) params.append("search", selectedChapter);
    if (selectedSchool)
      params.append(
        "university",
        selectedSchool.name ? selectedSchool.name : school
      );
    if (selectedCity) params.append("location", selectedCity);
    if (selectedOrga) params.append("organization", selectedOrga);
    if (igPage) params.append("igPage", igPage);
    params.append("skip", page * limit);
    params.append("limit", limit);

    return `${API_ROUTES.CHAPTERS}?${params.toString()}`;
  };

  // Handle search button click
  const handleSearch = async () => {
    setFilterLoading(true);
    setPage(0);
    setChaptersData([]); // Reset chapters for new search
    const url = buildApiUrl(0);
    setSearchParamsUrl(url);
    setFilterItem(false);
    // updateQueryParams();

    try {
      const res = await fetch(url);
      const result = await res.json();
      if (result?.chapters?.length > 0) {
        setChaptersData(result.chapters);
        setHasMore(result.chapters.length === limit);
      } else {
        setChaptersData([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setHasMore(false);
    } finally {
      setFilterLoading(false);
    }
  };

  // Handle clearing a filter
  const handleClearFilter = (filterType) => {
    switch (filterType) {
      case "chapter":
        setSelectedChapter("");
        setChapterFilter("search", "");
        break;
      case "school":
        setSelectedSchool("");
        setSchoolFilter("search", "");
        break;
      case "location":
        setSelectedCity("");
        setCitiesFilter("search", "");
        break;
      case "organization":
        setSelectedOrga("");
        break;
      case "igPage":
        setIgPage("");
        break;
      default:
        break;
    }
    updateQueryParams();
  };

  // Infinite scroll load more
  const loadMore = useCallback(async () => {
    if (!filterLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      setFilterLoading(true);
      try {
        const url = buildApiUrl(nextPage);
        const res = await fetch(url);
        const result = await res.json();
        if (result?.chapters?.length > 0) {
          setChaptersData((prev) => [...prev, ...result.chapters]);
          setHasMore(result.chapters.length === limit);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching more chapters:", error);
        setHasMore(false);
      } finally {
        setFilterLoading(false);
      }
    }
  }, [filterLoading, hasMore, page]);

  // Observe last chapter for infinite scroll
  const lastItemRef = useCallback(
    (node) => {
      if (filterLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [filterLoading, hasMore, loadMore]
  );

  // Initialize with URL query params
  useEffect(() => {
    if (chapter || school || location || qigPage || organization) {
      setSelectedChapter(chapter);
      setSelectedSchool(school);
      setSelectedCity(location);
      setIgPage(qigPage);
      setSelectedOrga(organization);
      handleSearch();
    }
  }, [chapter, school, location, qigPage, organization]);

  return (
    <div>
      <div className="sm:p-7 sm:bg-[#141616] xl:rounded-[60px] rounded-[30px] grid xl:grid-cols-5 sm:grid-cols-3 grid-cols-2 sm:gap-3 gap-[10px] items-center">
        <CustomSelect
          value={selectedOrga}
          setValue={(value) => {
            setSelectedOrga(value);
            setCitiesFilter("search", value);
          }}
          options={orgs?.organizations}
          optionKey="organization"
          optionLabel="organization"
          placeholder="Search Organization"
          changeBg
          onSearchChange={(searchTerm) => setCitiesFilter("search", searchTerm)}
          loading={isLoading}
        />

        <div className="relative w-full">
          <input
            type="text"
            value={selectedChapter}
            onChange={(e) => {
              setSelectedChapter(e.target.value);
              setChapterFilter("search", e.target.value);
            }}
            placeholder="Enter Chapter"
            className="appearance-none border border-[#383838]  sm:bg-black bg-[#383838] text-white focus:outline-none  w-full sm:h-[60px] h-[52px] sm:pl-6  pl-[14px] pr-[30px] rounded-full text-base  font-normal leading-[20px] placeholder:text-white/70 placeholder:text-base"
          />
          {selectedChapter && (
            <button
              onClick={() => handleClearFilter("chapter")}
              className="absolute text-white transform -translate-y-1/2 right-2 top-1/2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="relative">
          <SchoolSelect
            newSchool={selectedSchool?.name ? selectedSchool?.name : school}
            setNewSchool={setSelectedSchool}
            placeholder="Select School"
            className="w-full border border-[#383838] outline-none focus:outline-none sm:h-[60px] h-[52px]  sm:pl-5 pl-[14px]  rounded-full text-base font-normal placeholder:text-base   pr-[30px] text-white placeholder:text-white/70 cursor-pointer sm:bg-black bg-[#383838]"
          />
        </div>
        <div className="relative">
          <LocationSelect
            newState={selectedCity}
            setNewState={setSelectedCity}
            searParams={23}
          />
        </div>

        <button
          onClick={handleSearch}
          className="group right-[10px] sm:h-[60px] h-12 w-full bg-white rounded-full text-[14px] font-semibold leading-[28px] border hover:text-white hover:bg-black sm:border-black border-white relative z-[1] overflow-hidden transition-all duration-300 ease-in-out before:content-[''] before:absolute before:top-[162%] before:left-1/2 before:w-[210%] before:h-[290%] sm:before:bg-white before:bg-black before:border before:border-black before:transform before:-translate-x-1/2 before:-rotate-[8deg] before:rounded-[80%] before:z-[-1] before:duration-[800ms] hover:before:-top-[96%] hover:before:bg-black ml-3
    col-span-2 sm:col-span-1"
        >
          <span className="text-black sm:group-hover:text-white group-hover:text-white z-[99] transition-all duration-300 ease-in-out">
            Search
          </span>
        </button>
      </div>

      <div className="">
        {filterLoading && chaptersData.length === 0 ? (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <ChapterSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid items-stretch gap-5 mt-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
            {chaptersData?.map((item, index) => {
              const isLastItem = index === chaptersData.length - 1;
              return (
                <div
                  className="h-full"
                  key={index}
                  ref={isLastItem ? lastItemRef : null}
                >
                  <ChapterFilterContent item={item} />
                </div>
              );
            })}
          </div>
        )}
        {hasMore && chaptersData.length > 0 && (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <ChapterSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
      {!filterLoading && !hasMore && chaptersData.length === 0 && (
        <div className="mt-10 text-xl font-bold text-center text-white md:text-2xl lg:text-3xl xl:text-4xl">
          No chapters found
        </div>
      )}
    </div>
  );
};

export default ChapterFilter;
