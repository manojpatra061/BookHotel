import { useSearchContext } from "@/contexts/SearchContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const Sort = () => {
  const [searchParams] = useSearchParams();
  const { setNewSearchInputs, ...searchInputs } = useSearchContext();
  const navigate = useNavigate();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    const newSearchInputs = searchInputs;
    newSearchInputs.sort = sort;
    newSearchInputs.page = undefined;
    setNewSearchInputs(newSearchInputs);
    searchParams.delete("page");
    if (sort) {
      searchParams.set("sort", sort);
    } else {
      searchParams.delete("sort");
    }
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="bg-gray-200 rounded border border-black">
      <select onChange={handleSortChange} className="cursor-pointer w-full text-xl lg:text-base font-bold lg:font-normal">
        <option className="text-sm" value="">Sort by:</option>
        <option className="text-sm" value="starRating">Star rating (low to high)</option>
        <option className="text-sm" value="-starRating">Star rating (high to low)</option>
        <option className="text-sm" value="pricePerNight">Price per night (low to high)</option>
        <option className="text-sm" value="-pricePerNight">Price per night (high to low)</option>
      </select>
    </div>
  );
};

export default Sort;
