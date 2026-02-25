"use client";
import { useEffect, useState, useRef, useCallback } from "react";

import config from "@/config";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import PropytesContent from "./PropytesContent";
import ProphytesSkeleton from "../skeleton/ProphytesSkeleton";
import CustomSelect from "./CustomSelect";
import { useGetProphytesQuery } from "@/src/redux/services/prophytesApi";
import ArrowLeftSvg from "@/public/img/icon/ArrowLeftSvg";

const ProphytesFilter = ({ setFilterItem }) => {
  const [selectedMember, setselectedMember] = useState("");
  const [organization, setsetOrganaiztion] = useState("");

  const [prophytes, setProphtes] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [searchParamsUrl, setSearchParamsUrl] = useState("");
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const limit = 12;
  const observer = useRef(null);

  const {
    debouncedFilters: organizationFilter,
    setFilter: setOrganizationFilter,
  } = useDebouncedQuery();

  const { data: organizations, isLoading: organizations_loading } =
    useGetProphytesQuery({
      search: organizationFilter.search || undefined,
    });

  const buildApiUrl = (page = 0) => {
    const params = new URLSearchParams();
    if (selectedMember) params.append("search", selectedMember);
    if (organization) params.append("organization", organization);
    params.append("skip", page * limit);
    params.append("limit", limit);
    return `${config.apiBaseUrl}/desktop/famous-prophytes?${params.toString()}`;
  };

  const handleSearch = () => {
    setFilterLoading(true);
    setPage(0);
    setProphtes([]);
    setInitialLoadComplete(false);
    const url = buildApiUrl(0);
    setSearchParamsUrl(url);
    setFilterItem(false);
  };

  const loadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !filterLoading) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMore, filterLoading]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!searchParamsUrl) return;
      setFilterLoading(true);

      const res = await fetch(buildApiUrl(page));
      const result = await res.json();

      if (result?.data?.length > 0) {
        setProphtes((prev) => [...prev, ...result.data]);
        setHasMore(result.data.length === limit);
      } else {
        setHasMore(false);
      }

      setFilterLoading(false);
      setInitialLoadComplete(true);
    };

    fetchData();
  }, [searchParamsUrl, page]);

  const getShortCode = (organization) => {
    return organization
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // Check if we should show "not found" message
  const showNotFoundMessage =
    initialLoadComplete && prophytes.length === 0 && !filterLoading;

  return (
    <div>
      <div className="items-center justify-between gap-1 pb-5 sm:pb-10 lg:flex">
        <h2 className="text-white font-montserrat">
          Famous <br className="hidden lg:block" /> Prophytes
        </h2>
        <div className="xl:bg-[#383838] rounded-[60px] xl:p-5 lg:mt-0 mt-5 flex sm:flex-row flex-col sm:gap-2 gap-[10px] items-center self-end">
          <div className="flex items-center gap-1 pr-5 justify-between border border-[#383838] sm:bg-black bg-[#383838] rounded-[36px] lg:w-[280px] sm:w-[300px] w-full">
            <input
              type="text"
              value={selectedMember}
              onChange={(e) => setselectedMember(e.target.value)}
              placeholder="Search Prophyte name..."
              className="appearance-none sm:bg-black bg-[#383838] text-white focus:outline-none sm:w-[255px] w-full  sm:py-5 py-[14px]  sm:pl-[30px] xs:pl-4 pl-3 rounded-full text-base  font-normal leading-[22px]   placeholder:text-white placeholder:text-base "
            />
          </div>

          <div className="lg:w-[280px] sm:w-[300px] w-full">
            <CustomSelect
              value={organization}
              setValue={setsetOrganaiztion}
              options={organizations?.data}
              optionKey="organization"
              optionLabel="organization"
              placeholder="Search Organaization"
              changeBg
              onSearchChange={(searchTerm) =>
                setOrganizationFilter("search", searchTerm)
              }
            />
          </div>

          <button
            onClick={handleSearch}
            className="group right-[10px] sm:h-[60px] h-12 sm:w-[208px] w-full bg-white rounded-full text-[14px] font-semibold leading-[28px]  hover:text-white hover:bg-black relative z-[1] overflow-hidden transition-all duration-300 ease-in-out before:content-[''] before:absolute before:top-[162%] before:left-1/2 before:w-[210%] before:h-[290%] sm:before:bg-white before:bg-black  before:transform before:-translate-x-1/2 before:-rotate-[8deg] before:rounded-[80%] before:z-[-1] before:duration-[800ms] hover:before:-top-[96%] hover:before:bg-black sm:ml-[10px] ml-3"
          >
            <span className="text-black sm:group-hover:text-white group-hover:text-white z-[99] transition-all duration-300 ease-in-out">
              Search
            </span>
          </button>
        </div>
      </div>

      <div className="mt-0 sm:mt-12">
        {filterLoading && prophytes?.length === 0 ? (
          <div className="grid gap-3 lg:grid-cols-2 sm:gap-6">
            <ProphytesSkeleton />
            <ProphytesSkeleton />
          </div>
        ) : (
          <>
            {prophytes?.length > 0 && (
              <div className="grid items-stretch gap-3 lg:grid-cols-2 sm:gap-6">
                {prophytes?.map((item, index) => {
                  const isLastItem = index === prophytes?.length - 1;
                  const sortCode = getShortCode(item.organization);
                  return (
                    <div
                      className="h-full"
                      key={index}
                      ref={isLastItem ? lastItemRef : null}
                    >
                      <PropytesContent prophyte={item} sortCode={sortCode} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Show "not found" message when conditions are met */}
            {showNotFoundMessage && (
              <div className="mt-10 text-xl font-bold text-center text-white md:text-2xl lg:text-3xl xl:text-4xl">
                Not found!
              </div>
            )}
          </>
        )}

        {hasMore && prophytes.length > 0 && !filterLoading && (
          <div className="grid gap-3 lg:grid-cols-2 sm:gap-6">
            <ProphytesSkeleton />
            <ProphytesSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProphytesFilter;
