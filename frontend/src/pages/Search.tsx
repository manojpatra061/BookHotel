import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { Filter, Pagination, SearchResultsCard, Sort, Toggle } from "../components";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const { setNewSearchInputs, ...searchInputs } = useSearchContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchHotels", searchInputs],
    queryFn: async () => {
      const searchResults = await apiClient.searchHotels(searchInputs);
      return searchResults;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 2,
  });
  // console.log('searchResults = ', searchResults);
  // TODO: when I click a page number it loads up the data but keeps me at the bottom. I want to go on top.
  // TODO: create carousel component

  if (isLoading) {
    return <h1 className="text-3xl font-bold">Loading...</h1>;
  }

  if (!searchResults) {
    return <h1 className="text-3xl font-bold">No hotels found...</h1>;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_5fr] gap-4">
        <div className="hidden lg:block py-1">
          <div className=" bg-gray-200 border border-black rounded p-1 sticky top-1">
            <Toggle toggleText="Filter By:">
              <Filter />
            </Toggle>
          </div>
        </div>
        <div>
          <div className="block lg:hidden py-1 sticky top-0 my-2">
            <div className=" bg-gray-200 border border-black rounded p-1">
              <Toggle toggleText="Filter By:">
                <Filter />
              </Toggle>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-4">
            <div className="lg:order-2 flex flex-col justify-center">
              <Sort />
            </div>
            <div className="lg:order-1 flex flex-col justify-center">
              <h1 className="text-2xl lg:text-3xl font-bold">
                {`Found ${searchResults.totalFound} Hotels... (Page:
              ${searchResults.pagination.currentPage}/${searchResults.pagination.totalPages})`}
              </h1>
            </div>
          </div>
          <div>
            {searchResults.hotels.map((hotel, i) => (
              <SearchResultsCard key={i} hotel={hotel} />
            ))}
          </div>
          <div>
            <Pagination
              currentPage={searchResults.pagination.currentPage}
              totalPages={searchResults.pagination.totalPages}
              onPageChange={(page) => {
                setNewSearchInputs({ ...searchInputs, page });
                searchParams.set("page", page.toString());
                navigate(`/search?${searchParams.toString()}`);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
