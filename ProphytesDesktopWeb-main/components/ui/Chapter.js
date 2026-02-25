"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGetAllOrganizationsQuery } from "@/src/redux/services/organizationApi";
import { useGetChapterQuery } from "@/src/redux/services/chapterApi";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";

import ChapterContent from "./ChapterContent";
import { API_ROUTES } from "@/src/configs/constants";
import CustomSelect from "./CustomSelect";

import MobileSearchSvg from "@/public/img/icon/MobileSearchSvg";
import SchoolSelect from "./SchoolSelect";
import StateSelect from "@/src/app/(dashboardLayout)/components/StateSelect";

const Chapter = () => {
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedOrga, setSelectedOrga] = useState("");
  const [filterLoading, setFilterLoading] = useState(false);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [newSchool, setNewSchool] = useState("");
  const [newState, setNewState] = useState("");

  const router = useRouter();
  const { data: orgs, isLoading, error } = useGetAllOrganizationsQuery();

  const { debouncedFilters: citiesFilters, setFilter: setCitiesFilter } =
    useDebouncedQuery();

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedChapter) params.append("search", selectedChapter);
    if (selectedOrga) params.append("organization", selectedOrga);
    if (newSchool) params.append("university", newSchool.name);
    if (newState) params.append("location", newState);

    return params.toString();
  };
  const initial = buildQueryParams() ? false : true;
  const { data: chapter = [], isLoading: loading } = useGetChapterQuery({
    search: selectedChapter,
    organization: selectedOrga,
    university: newSchool.name,
    location: newState.name,
    initial,
  });

  const handleSearch = async () => {
    setFilterLoading(true);
    const url = `${API_ROUTES.CHAPTERS}?${buildQueryParams()}`;

    try {
      const res = await fetch(url);
      const result = await res.json();
      setFilteredChapters(result?.chapters || []);
    } catch (err) {
      console.error("Failed to fetch filtered chapters", err);
      setFilteredChapters([]);
    } finally {
      setFilterLoading(false);
    }
  };

  const handleLoadMore = () => {
    const params = new URLSearchParams();
    if (selectedChapter) params.append("chapter", selectedChapter);
    if (newSchool) params.append("school", newSchool.name);
    if (selectedOrga) params.append("organization", selectedOrga);
    if (newState) params.append("location", newState.name);

    const query = params.toString();
    query ? router.push(`/chapters?${query}`) : router.push(`/chapters`);
  };

  useEffect(() => {
    if (chapter && !loading) {
      setFilteredChapters(chapter?.chapters);
    }
  }, [chapter, loading]);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className="lg:py-[125px] md:py-[110px] xs:py-20 py-[60px] bg-[#000000]">
      <div className="container">
        <div id="section2" className="mb-5 sm:mb-12">
          <h2 className="text-center xs:pb-[15px] font-montserrat ">
            Prophytes Chapters
          </h2>
        </div>

        <div className="sm:p-7 sm:bg-[#141616] xl:rounded-[60px] rounded-[35px] grid xl:grid-cols-5 sm:grid-cols-3 grid-cols-2 sm:gap-3 gap-[10px] items-center">
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
            onSearchChange={(searchTerm) =>
              setCitiesFilter("search", searchTerm)
            }
            loading={isLoading}
          />
          <div className="relative w-full">
            <input
              className="appearance-none border border-[#383838] sm:bg-black bg-[#383838] text-white focus:outline-none  w-full  sm:h-[60px] h-[50px]  sm:pl-5  pl-[14px] pr-[30px]  rounded-full text-base   font-normal sm:leading-[22px] leading-5  placeholder:text-white/70 placeholder:text-base"
              type="text"
              onChange={(e) => setSelectedChapter(e.target.value)}
              value={selectedChapter}
              placeholder="Chapter Name"
            />
            {selectedChapter && (
              <button
                onClick={() => setSelectedChapter("")}
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

          <SchoolSelect
            newSchool={newSchool.name}
            setNewSchool={setNewSchool}
            placeholder="Select School"
            className="w-full outline-none focus:outline-none sm:h-[60px] h-[50px]  sm:pl-5 pl-[14px]  rounded-full text-base font-normal placeholder:text-base   pr-7 text-white placeholder:text-white/70 cursor-pointer sm:bg-black bg-[#383838] border border-[#383838]"
          />
          <StateSelect
            newState={newState}
            setNewState={setNewState}
            searParams={23}
            showLabel={false}
            isDiffrent={false}
            className="appearance-none  outline-none focus:outline-none sm:h-[60px] h-[50px]  sm:pl-5 pl-[14px]  rounded-full text-base font-normal placeholder:text-base sm:bg-black  bg-[#383838]  pr-[30px]  cursor-pointer placeholder:text-white/70 text-white w-full border border-[#383838]"
          />

          <button
            onClick={handleSearch}
            className="group right-[10px] sm:h-[60px] h-[50px] w-full bg-white rounded-full text-base font-medium leading-5  border hover:text-white hover:bg-black sm:border-black border-white relative z-[1] overflow-hidden transition-all duration-300 ease-in-out before:content-[''] before:absolute before:top-[162%] before:left-1/2 before:w-[210%] before:h-[290%] sm:before:bg-white before:bg-black before:border before:border-black before:transform before:-translate-x-1/2 before:-rotate-[8deg] before:rounded-[80%] before:z-[-1] before:duration-[800ms] hover:before:-top-[96%] hover:before:bg-black ml-3
    col-span-2 sm:col-span-1"
          >
            <span className="text-black sm:group-hover:text-white group-hover:text-white z-[99] transition-all duration-300 ease-in-out">
              <span className="flex items-center justify-center gap-[10px] sm:text-base sm:leading-5 text-sm leading-[22px]">
                <MobileSearchSvg className="block sm:hidden" />
                Search
              </span>
            </span>
          </button>
        </div>

        <div className="">
          <ChapterContent
            chapter={filteredChapters?.length > 0 && filteredChapters}
            loading={filterLoading || loading}
          />
        </div>

        {(!loading || !filterLoading) && filteredChapters?.length > 0 && (
          <div className="block m-auto mt-6 text-center sm:mt-14">
            <button
              onClick={handleLoadMore}
              className="group relative inline-flex m-auto xs:gap-[18px] gap-[10px] items-center  h-[66px] overflow-hidden  bg-white border-white rounded-[99px]   transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0  after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto"
            >
              <span className="ml-[5px]  py-[14px]  px-5  bg-black text-lg   font-medium  text-white leading-[26px]   rounded-[99px]">
                <span className="relative z-[9] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
                  See More
                </span>
              </span>

              <span className="pr-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black group-hover:text-white relative z-[9] xs:size-6 size-6 transition-all duration-500 ease-out"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.7497 12.751H3.25V11.251L20.7497 11.251V12.751Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.9998 11.2441C16.4723 11.2441 13.5898 14.3462 13.5898 17.6541V18.4041H15.0898V17.6541C15.0898 15.1426 17.3324 12.7441 19.9998 12.7441H20.7494V11.2441H19.9998Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.0037 12.7479C16.4762 12.7479 13.5938 9.6458 13.5938 6.33789V5.58789H15.0938V6.33789C15.0938 8.84947 17.3363 11.2479 20.0037 11.2479H20.7534V12.7479H20.0037Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </div>
        )}

        {!loading && !filterLoading && filteredChapters?.length <= 0 && (
          <div className="mt-10 text-xl font-bold text-center text-white md:text-2xl lg:text-3xl xl:text-4xl">
            No chapters found
          </div>
        )}
      </div>
    </section>
  );
};

export default Chapter;
