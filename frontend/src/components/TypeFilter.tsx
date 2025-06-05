import { hotelTypes } from "@/config/hotel-options-config";
import { useSearchContext } from "@/contexts/SearchContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const TypeFilter = () => {
  const { setNewSearchInputs, ...searchInputs } = useSearchContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleTypeChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchInputs = searchInputs;
      newSearchInputs.type = newSearchInputs.type || [];
      if (e.target.checked) {
        newSearchInputs.type.push(type);
        searchParams.append("type", type);
      } else {
        newSearchInputs.type = newSearchInputs.type.filter(
          (typeToDel) => typeToDel !== type
        );
        searchParams.delete("type", type);
      }
      newSearchInputs.page = undefined;
      setNewSearchInputs(newSearchInputs);
      searchParams.delete("page");
      navigate(`/search?${searchParams.toString()}`);
    };

  return (
    <div className="flex flex-col">
      <span className="text-lg font-semibold">Hotel type</span>
      <ul>
        {hotelTypes.map((type) => (
          <li>
            <label className="hover:underline">
              <input onChange={handleTypeChange(type)} type="checkbox" />
              <span className="mx-1">{type}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeFilter;
