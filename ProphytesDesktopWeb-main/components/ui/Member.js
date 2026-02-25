"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetAllOrganizationsQuery } from "@/src/redux/services/organizationApi";
import { useGetMembersQuery } from "@/src/redux/services/memberApi";

import MemberSkeleton from "../skeleton/MemberSkeleton";
import ClaimButton from "./ClaimButton";
import InputWithTypingAnimation from "./InputWithTypingAnimation";
import MemberCard from "./MemberCard";
import MemberSearchSvg from "@/public/img/icon/MemberSearchSvg";

import AngleRight from "@/public/img/icon/AngleRight";

const Member = () => {
  const useSearchParam = useSearchParams();
  const schoolParam = useSearchParam.get("school") || "";
  const organizationIdParam = useSearchParam.get("organizationId") || "";
  const chapterParam = useSearchParam.get("chapter") || "";
  const locationParam = useSearchParam.get("location") || "";
  const searchParam = useSearchParam.get("search") || "";

  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [selectedSchool, setSelectedSchool] = useState(schoolParam);
  const [displayCount, setDisplayCount] = useState(8);
  const [selectedChapter, setSelectedChapter] = useState(chapterParam);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(
    Number(organizationIdParam)
  );
  const [selectedName, setSelectedName] = useState(searchParam);
  const [filterLoading, setFilterLoading] = useState(false);
  const [name, setName] = useState(searchParam);
  // const [apiUrl, setApiUrl] = useState("");
  const router = useRouter();

  // Debounced search terms for school, location, and chapter
  // const { debouncedFilters: schoolFilters, setFilter: setSchoolFilter } =
  //   useDebouncedQuery();
  // const { debouncedFilters: locationFilters, setFilter: setLocationFilter } =
  //   useDebouncedQuery();
  // const { debouncedFilters: chapterFilters, setFilter: setChapterFilter } =
  //   useDebouncedQuery();

  // Construct the URL based on whether the search term exists
  // const schoolSearchUrl = schoolFilters.search
  //   ? `${API_ROUTES.VERSITIES}?search=${schoolFilters.search}`
  //   : API_ROUTES.VERSITIES;
  // const locationSearchUrl = locationFilters.search
  //   ? `${API_ROUTES.CITIES}?search=${locationFilters.search}`
  //   : API_ROUTES.CITIES;
  // const chapterSearchUrl = chapterFilters.search
  //   ? `${API_ROUTES.CHAPTERS}?search=${chapterFilters.search}`
  //   : API_ROUTES.CHAPTERS;

  const { data: organizations, isLoading: organizations_loading } =
    useGetAllOrganizationsQuery();

  // Build the dynamic query string based on user input
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedName) params.append("search", selectedName);
    if (selectedOrganizationId)
      params.append("organizationId", selectedOrganizationId);
    if (selectedSchool) params.append("school", selectedSchool);
    if (selectedChapter) params.append("chapter", selectedChapter);
    if (selectedLocation) params.append("location", selectedLocation);
    return params.toString();
  };

  // Fetch members based on query
  const {
    data: members,
    isLoading: loading,
    error: error,
  } = useGetMembersQuery({ initial: true });

  // const handleName = (e) => {
  //   setName(e.target.value);
  // };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilterLoading(true);
    setSelectedName(name);
    // setApiUrl(`${API_ROUTES.MEMBERS}?search=${encodeURIComponent(name)}`);
    // setFilterLoading(false);
    const query = buildQueryParams();
    query ? router.push(`/members?${query}`) : router.push(`/members`);
    setFilterLoading(false);
  };

  const handleSeeMore = () => {
    const query = buildQueryParams();
    query ? router.push(`/members?${query}`) : router.push(`/members`);
  };

  const removeId = () => {
    setSelectedOrganizationId("");
    // setApiUrl(""); // Reset apiUrl
  };

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setDisplayCount(5);
      } else {
        setDisplayCount(8);
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  useEffect(() => {
    if (
      selectedChapter ||
      selectedSchool ||
      selectedLocation ||
      selectedOrganizationId ||
      selectedName
    ) {
      const params = new URLSearchParams();
      if (selectedSchool) params.set("school", selectedSchool);
      if (selectedChapter) params.set("chapter", selectedChapter);
      if (selectedLocation) params.set("location", selectedLocation);
      if (selectedOrganizationId)
        params.set("organizationId", selectedOrganizationId);
      if (selectedName) params.set("search", selectedName);

      const newUrl = `/members?${params.toString()}`;
      // const newUrl = `/?${params.toString()}#members`;
      if (window.location.pathname + window.location.search !== newUrl) {
        router.push(newUrl);
      }
    }
  }, [
    selectedSchool,
    selectedChapter,
    selectedLocation,
    selectedOrganizationId,
    selectedName,
  ]);

  return (
    <section
      id="members"
      className="bg-[#141616]  md:py-[140px] xs:py-20  py-[60px]"
    >
      <div className="container">
        <div className="sm:mb-[40px] mb-6">
          <h2 className="sm:text-center font-montserrat">Verified Members</h2>
        </div>
        <div className="lg:h-[120px] sm:px-3 flex items-center justify-center lg:bg-black bg-transparent rounded-2xl">
          <div className="grid gap-5 lg:gap-6 lg:grid-cols-2">
            <div className="lg:bg-[#141616] bg-[#383838]  lg:mt-0 sm:mt-5  md:rounded-full rounded-[12px] py-4  flex lg:flex-nowrap flex-wrap items-center gap-[10px] md:gap-1 px-4  ">
              {organizations_loading ? (
                Array(9)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="sm:w-[60px] xs:w-11 w-10  h-[30px] rounded-full  bg-gray-300 animate-pulse  "
                    ></div>
                  ))
              ) : (
                <>
                  {organizations?.organizations?.length > 0 &&
                    organizations?.organizations?.map((item, i) => (
                      <div
                        onClick={() => {
                          setSelectedOrganizationId(item.id);
                        }}
                        key={i}
                        className=" border-[1px] lg:border-[#383838] [border-image-source:linear-gradient(0deg,#141616,#141616),linear-gradient(0deg,#383838,#383838)] rounded-full p-1 lg:bg-[#141414] bg-transparent"
                      >
                        <Image
                          className={`sm:w-[57px] xs:w-11 w-10 h-full  object-cover  cursor-pointer   ${selectedOrganizationId === item.id
                              ? "border-[1.5px] border-black rounded-full p-1"
                              : "border-[1.5px] border-transparent"
                            }`}
                          src={item?.miniLogo}
                          alt={item.fullName || "Organization Logo"}
                          width={68}
                          height={36}
                        />
                      </div>
                    ))}
                </>
              )}
              {/* {selectedOrganizationId ? (
                <button
                  onClick={() => removeId()}
                  className="text-sm font-medium leading-4 text-white underline"
                >
                  Clear
                </button>
              ) : null} */}
            </div>
            <div className="relative w-full ">
              <form className="py-2 sm:pl-6 pl-4 flex items-center  lg:bg-[#141616] bg-[#383838] rounded-full">
                <div>
                  <MemberSearchSvg />
                </div>

                <InputWithTypingAnimation
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                  placeholders={[
                    "Search Prophyte name...",
                    "Eric Usher",
                    "Joel Myers",
                  ]}
                />

                <div className="text-center sm:ml-3">
                  <button
                    onClick={handleSearch}
                    className="group right-[10px]  sm:h-[50px] h-8 sm:w-[164px] w-[77px] bg-white rounded-full sm:text-base text-sm  sm:leading-5 leading-[22px] font-medium  border  hover:text-white hover:bg-black sm:border-black border-white relative z-[1] overflow-hidden transition-all duration-300 ease-in-out  before:content-[''] before:absolute before:top-[162%] before:left-1/2 before:w-[210%] before:h-[290%] sm:before:bg-white before:bg-black before:border before:border-black before:transform before:-translate-x-1/2 before:-rotate-[8deg] before:rounded-[80%] before:z-[-1] before:duration-[800ms] hover:before:-top-[96%] hover:before:bg-black"
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

        <div className="">
          {loading ? (
            <div className="grid gap-4 mt-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <MemberSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 mt-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
              {members?.users?.length > 0 &&
                members?.users
                  ?.slice(0, displayCount)
                  .map((member, index) => (
                    <MemberCard key={index} member={member} />
                  ))}
            </div>
          )}
        </div>
        {members?.users?.length > 0 && (
          <div className="block m-auto mt-6 text-center sm:mt-14">
            <button
              onClick={handleSeeMore}
              className="group relative inline-flex m-auto xs:gap-[18px] gap-[10px] items-center  h-[66px] overflow-hidden  bg-white border-white rounded-[99px]   transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0  after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto  "
            >
              <span className="ml-[5px] py-[14px] px-5   bg-black xs:text-base text-[13px]  font-bold  text-white xs:leading-5  leading-4 rounded-[99px]">
                <span className="relative z-[9]  group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
                  See More
                </span>
              </span>

              <span className="pr-3 mt-3">
                <AngleRight className="text-black group-hover:text-white relative z-[9] xs:size-6 size-6 transition-all duration-500 ease-out" />
              </span>
            </button>
          </div>
        )}
      </div>

      {!loading && (!members?.users || members.users.length === 0) && (
        <div className="flex justify-center w-full mt-10">
          {/* <ClaimButton title="Claim Membership" /> */}
          <div className="col-span-2 mt-10 text-xl font-bold text-center text-white md:text-2xl lg:text-3xl">
            Member Not found!
          </div>
        </div>
      )}
    </section>
  );
};

export default Member;
