import { hotelFacilities } from "@/config/hotel-options-config";
import { useSearchContext } from "@/contexts/SearchContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const FacilitiesFilter = () => {
  const { setNewSearchInputs, ...searchInputs } = useSearchContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleFacilitiesChange =
    (facility: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchInputs = searchInputs;
      newSearchInputs.facilities = newSearchInputs.facilities || [];
      if (e.target.checked) {
        newSearchInputs.facilities.push(facility);
        searchParams.append("facilities", facility);
      } else {
        newSearchInputs.facilities = newSearchInputs.facilities.filter(
          (facilityToDel) => facilityToDel !== facility
        );
        searchParams.delete("facilities", facility);
      }
      newSearchInputs.page = undefined;
      setNewSearchInputs(newSearchInputs);
      searchParams.delete("page");
      navigate(`/search?${searchParams.toString()}`);
    };

  return (
    <div className="flex flex-col">
      <span className="text-lg font-semibold">Facilities</span>
      <ul>
        {hotelFacilities.map((facility) => (
          <li>
            <label className="hover:underline">
              <input
                onChange={handleFacilitiesChange(facility)}
                type="checkbox"
              />
              <span className="mx-1">{facility}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacilitiesFilter;
