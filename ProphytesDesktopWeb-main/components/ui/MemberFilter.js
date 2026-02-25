"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { API_ROUTES } from "@/src/configs/constants";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import { useRouter, useSearchParams } from "next/navigation";
import MemberSkeleton from "../skeleton/MemberSkeleton";
import InputWithTypingAnimation from "./InputWithTypingAnimation";
import MemberCard from "./MemberCard";
import ClaimButton from "./ClaimButton";
import { useGetAllOrganizationsQuery } from "@/src/redux/services/organizationApi";
import MemberSearchSvg from "@/public/img/icon/MemberSearchSvg";

const limit = 12;

const MemberFilter = ({ filterItem, setFilterItem }) => {
  const currentFetchId = useRef(0);

  const router = useRouter();
  const useSearchParam = useSearchParams();
  const schoolParam = useSearchParam.get("school") || "";
  const organizationIdParam = useSearchParam.get("organizationId") || "";
  const chapterParam = useSearchParam.get("chapter") || "";
  const locationParam = useSearchParam.get("location") || "";
  const searchParam = useSearchParam.get("search") || "";

  const [selectedSchool, setSelectedSchool] = useState(schoolParam);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(
    Number(organizationIdParam) || ""
  );
  const [selectedChapter, setSelectedChapter] = useState(chapterParam);
  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [searchText, setSearchText] = useState(searchParam);
  const [searchInput, setSearchInput] = useState(searchParam);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);

  const limit = 12;

  // const indexRef = useRef(0);
  // const forwardRef = useRef(true);
  // const fullPlaceholder = "Search by name,";

  // Debounced search terms for school, location, and chapter
  const { debouncedFilters: schoolFilters, setFilter: setSchoolFilter } =
    useDebouncedQuery();
  const { debouncedFilters: locationFilters, setFilter: setLocationFilter } =
    useDebouncedQuery();
  const { debouncedFilters: chapterFilters, setFilter: setChapterFilter } =
    useDebouncedQuery();

  // const schoolSearchUrl = schoolFilters.search
  //   ? `${API_ROUTES.VERSITIES}?search=${schoolFilters.search}`
  //   : selectedSchool
  //   ? `${API_ROUTES.VERSITIES}?search=${selectedSchool}`
  //   : API_ROUTES.VERSITIES;

  // const locationSearchUrl = locationFilters.search
  //   ? `${API_ROUTES.CITIES}?search=${locationFilters.search}`
  //   : selectedLocation
  //   ? `${API_ROUTES.CITIES}?search=${selectedLocation}`
  //   : API_ROUTES.CITIES;

  // const chapterSearchUrl = chapterFilters.search
  //   ? `${API_ROUTES.CHAPTERS}?search=${chapterFilters.search}`
  //   : selectedChapter
  //   ? `${API_ROUTES.CHAPTERS}?search=${selectedChapter}`
  //   : API_ROUTES.CHAPTERS;
  const { data: organizations, isLoading: orgLoading } =
    useGetAllOrganizationsQuery();

  const observer = useRef();

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedSchool) params.set("school", selectedSchool);
    if (selectedChapter) params.set("chapter", selectedChapter);
    if (selectedLocation) params.set("location", selectedLocation);
    if (selectedOrganizationId)
      params.set("organizationId", selectedOrganizationId);
    if (searchText) params.set("search", searchText);

    const newUrl = `/members?${params.toString()}`;

    searchText && setSearchInput(searchText);
    if (window.location.pathname + window.location.search !== newUrl) {
      router.replace(newUrl); // or router.replace(newUrl)
    }
  }, [
    selectedSchool,
    selectedChapter,
    selectedLocation,
    selectedOrganizationId,
    searchText,
  ]);

  const buildApiUrl = (pageNum = 0) => {
    const params = new URLSearchParams();
    if (searchText) params.append("search", searchText);
    if (selectedOrganizationId)
      params.append("organizationId", selectedOrganizationId);
    if (selectedSchool) params.append("school", selectedSchool);
    if (selectedChapter) params.append("chapter", selectedChapter);
    if (selectedLocation) params.append("location", selectedLocation);
    params.append("skip", pageNum * limit);
    params.append("limit", limit);
    return `${API_ROUTES.MEMBERS}?${params.toString()}`;
  };

  const fetchMembers = useCallback(
    async (pageNum = 0, reset = false) => {
      const fetchId = ++currentFetchId.current;

      if (reset) {
        setLoading(true);
      } else {
        setIsPaginating(true);
      }

      try {
        const url = buildApiUrl(pageNum);
        const res = await fetch(url);
        const result = await res.json();

        // Ignore outdated fetch
        if (fetchId !== currentFetchId.current) return;

        if (result?.users) {
          setMembersData((prev) =>
            reset ? result.users : [...prev, ...result.users]
          );
          setHasMore(result.users.length === limit);
        } else {
          if (reset) setMembersData([]);
          setHasMore(false);
        }
      } catch (err) {
        if (fetchId === currentFetchId.current) {
          console.error("Fetch error", err);
          setHasMore(false);
        }
      } finally {
        if (fetchId === currentFetchId.current) {
          setLoading(false);
          setIsPaginating(false);
        }
      }
    },
    [
      searchText,
      selectedOrganizationId,
      selectedSchool,
      selectedChapter,
      selectedLocation,
    ]
  );

  useEffect(() => {
    setSelectedOrganizationId(Number(organizationIdParam));

    // Reset other filters ONLY if no other query params are present
    if (!schoolParam && !chapterParam && !locationParam && !searchParam) {
      setChapterFilter("search", "");
      setLocationFilter("search", "");
      setSchoolFilter("search", "");
      setSelectedSchool("");
      setSelectedChapter("");
      setSelectedLocation("");
      setSearchText("");
      setSearchInput("");
      setPage(0);
      fetchMembers(0, true);
    }
  }, [organizationIdParam]);

  useEffect(() => {
    setPage(0);
    setMembersData([]);
    fetchMembers(0, true);
  }, [
    selectedOrganizationId,
    selectedSchool,
    selectedChapter,
    selectedLocation,
    fetchMembers,
  ]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (page === 0) return;
    fetchMembers(page);
  }, [page, fetchMembers]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading || isPaginating) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, isPaginating, hasMore, loadMore]
  );

  const clearFilters = () => {
    // setSchoolFilter("search", "");
    // setLocationFilter("search", "");
    // setChapterFilter("search", "");
    // setSelectedSchool("");
    // setSelectedChapter("");
    // setSelectedLocation("");
    setSelectedOrganizationId("");
    // setSearchText("");
    // setSearchInput("");
    setFilterItem(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchText(searchInput);
    setPage(0);
    fetchMembers(0, true);
    setFilterItem(false);
  };

  useEffect(() => {
    if (
      selectedSchool ||
      selectedChapter ||
      selectedLocation ||
      selectedOrganizationId ||
      searchText
    ) {
      setFilterItem(false);
    } else {
      setFilterItem(true);
    }
  }, [
    selectedSchool,
    selectedChapter,
    selectedLocation,
    selectedOrganizationId,
    searchText,
    setFilterItem,
  ]);

  return (
    <section className="">
      <div className="">
        {/* <div className="flex flex-wrap gap-4 py-8">
          <CustomSelect
            value={selectedSchool}
            setValue={setSelectedSchool}
            options={versities?.data}
            optionKey="name"
            optionLabel="name"
            placeholder="Search School"
            changeBg={false}
            onSearchChange={(term) => setSchoolFilter("search", term)}
            loading={versitiesLoading}
            autoSearch={false}
          />
          <CustomSelect
            value={selectedChapter}
            setValue={setSelectedChapter}
            options={chapters?.chapters}
            optionKey="chapter_name"
            optionLabel="chapter_name"
            placeholder="Search Chapter"
            changeBg={false}
            onSearchChange={(term) => setChapterFilter("search", term)}
            loading={chaptersLoading}
            autoSearch={false}
          />
          <CustomSelect
            value={selectedLocation}
            setValue={setSelectedLocation}
            options={cities?.data}
            optionKey="name"
            optionLabel="name"
            placeholder="Search Location"
            changeBg={false}
            onSearchChange={(term) => setLocationFilter("search", term)}
            loading={citiesLoading}
            autoSearch={false}
          />
        </div> */}

        <div className="sm:mb-[40px] mb-6">
          <h2 className="sm:text-center font-montserrat">Verified Members</h2>
        </div>

        <div className="lg:h-[120px] sm:px-3 flex items-center justify-center lg:bg-black bg-transparent rounded-2xl">
          <div className="grid gap-5 lg:gap-6 lg:grid-cols-2">
            <div className="lg:bg-[#141616] bg-[#383838]  lg:mt-0 sm:mt-5  md:rounded-full rounded-[12px] py-4  flex lg:flex-nowrap flex-wrap items-center gap-[10px] md:gap-1 px-4">
              {orgLoading
                ? Array(9)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-[65px] h-[30px] rounded-full  bg-gray-300 animate-pulse  "
                    ></div>
                  ))
                : organizations?.organizations?.map((org, index) => (
                  <div
                    key={index}
                    className={` ${selectedOrganizationId === org.id
                        ? "border-[1.5px] border-white rounded-full p-[6px]"
                        : "border-[1.5px] border-transparent"
                      }`}
                  >
                    <div className=" border-[1px] lg:border-[#383838] [border-image-source:linear-gradient(0deg,#141616,#141616),linear-gradient(0deg,#383838,#383838)] rounded-full p-1 lg:bg-[#141414] bg-transparent">
                      <Image
                        key={org.id}
                        src={org.miniLogo}
                        alt={org.fullName || "Organization Logo"}
                        width={68}
                        height={36}
                        className={`sm:w-[57px] xs:w-11 w-9 h-full  object-cover  cursor-pointer  `}
                        onClick={() => setSelectedOrganizationId(org.id)}
                      />
                    </div>
                  </div>
                ))}
              {selectedOrganizationId ? (
                <button
                  onClick={clearFilters}
                  className="self-center text-white underline"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="relative w-full">
              <form
                onSubmit={handleSearchSubmit}
                className="py-2 sm:pl-6 pl-4 flex items-center  lg:bg-[#141616] bg-[#383838] rounded-full"
              >
                <div>
                  <MemberSearchSvg />
                </div>
                <InputWithTypingAnimation
                  value={searchInput || ""}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholders={[
                    "Search Prophyte name...",
                    "Eric Usher",
                    "Joel Myers",
                  ]}
                />

                <div className=" sm:ml-3">
                  <button
                    type="submit"
                    className="group right-[10px]  sm:h-[50px] h-8 sm:w-[164px] w-[77px] bg-white rounded-full text-[14px] font-semibold leading-[28px]  border  hover:text-white hover:bg-black sm:border-black border-white relative z-[1] overflow-hidden transition-all duration-300 ease-in-out  before:content-[''] before:absolute before:top-[162%] before:left-1/2 before:w-[210%] before:h-[290%] sm:before:bg-white before:bg-black before:border before:border-black before:transform before:-translate-x-1/2 before:-rotate-[8deg] before:rounded-[80%] before:z-[-1] before:duration-[800ms] hover:before:-top-[96%] hover:before:bg-black"
                  >
                    <span className="text-black sm:group-hover:text-white group-hover:text-white z-[99] transition-all duration-300 ease-in-out">
                      Search
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 mt-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {Array(8)
            .fill(0)
            .map((_, idx) => (
              <MemberSkeleton key={idx} />
            ))}
        </div>
      ) : (
        <>
          {!filterItem && membersData.length > 0 && (
            <div className="grid gap-4 mt-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
              {membersData.map((member, idx) => {
                const isLast = idx === membersData.length - 1;
                return (
                  <div key={member.id || idx} ref={isLast ? lastItemRef : null}>
                    <MemberCard member={member} />
                  </div>
                );
              })}
            </div>
          )}

          {isPaginating && (
            <div className="grid gap-4 mt-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              {Array(8)
                .fill(0)
                .map((_, idx) => (
                  <MemberSkeleton key={idx} />
                ))}
            </div>
          )}

          {!filterItem && membersData.length === 0 && (
            <div className="flex justify-center w-full mt-10">
              {/* <ClaimButton title="Claim Membership" /> */}
              <h2>Member not found!</h2>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MemberFilter;
