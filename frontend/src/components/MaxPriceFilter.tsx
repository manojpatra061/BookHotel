import { useSearchContext } from "@/contexts/SearchContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const MaxPriceFilter = () => {
  const { setNewSearchInputs, ...searchInputs } = useSearchContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const maxPrice = parseInt(e.target.value);
    const newSearchInputs = searchInputs;
    newSearchInputs.maxPrice = maxPrice;
    newSearchInputs.page = undefined;
    setNewSearchInputs(newSearchInputs);
    searchParams.delete("page");
    if (maxPrice) {
      searchParams.set("maxPrice", maxPrice.toString());
    } else {
      searchParams.delete("maxPrice");
    }
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-col">
      <div className="text-lg font-semibold">Max price</div>
      <select
        onChange={handleMaxPriceChange}
        className=" bg-white rounded border border-black"
      >
        <option value="">select max price</option>
        <option value="5000">₹5000</option>
        <option value="4000">₹4000</option>
        <option value="3000">₹3000</option>
        <option value="2000">₹2000</option>
        <option value="1000">₹1000</option>
      </select>
    </div>
  );
};

export default MaxPriceFilter;
