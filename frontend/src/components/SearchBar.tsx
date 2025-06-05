import { SubmitHandler, useForm } from "react-hook-form";
import { TbWorldSearch } from "react-icons/tb";
import { DevTool } from "@hookform/devtools";
import { SearchInputsType, useSearchContext } from "../contexts/SearchContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./";

const SearchBar = () => {
  const formMethods = useForm<SearchInputsType>();
  const { register, handleSubmit, reset } = formMethods;
  const { setNewSearchInputs } = useSearchContext();
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onSubmit: SubmitHandler<SearchInputsType> = (data) => {
    setNewSearchInputs(data);

    // NOTE: not just 'page' but need to del all
    // searchParams.delete("page");
    [...searchParams.keys()].forEach((paramKey) => {
      searchParams.delete(paramKey);
    });

    if (data.destination) {
      searchParams.append("destination", data.destination);
    }
    if (data.adultCount) {
      searchParams.append("adultCount", data.adultCount.toString());
    }
    if (data.childCount) {
      searchParams.append("childCount", data.childCount.toString());
    }
    navigate(`/search?${searchParams.toString()}`);
  };
  return (
    <div className="px-10 md:px-40 -mt-8">
      <div className="container mx-auto bg-orange-400 p-4 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap"
        >
          {/* destination, adultCount, childCount, page, checkIn, checkOut */}
          <div className="items-center justify-stretch flex flex-1 gap-2 bg-white border border-black p-2">
            <TbWorldSearch size={25} />
            <input
              type="text"
              {...register("destination")}
              placeholder="Where are you going?"
              className="flex-1 px-2 py-1"
            />
          </div>
          <div className="flex-1 flex gap-2">
            <input
              type="number"
              {...register("adultCount")}
              placeholder="Adults"
              min={1}
              max={4}
              className="flex-1 border border-black p-2 bg-white"
            />
            <input
              type="number"
              {...register("childCount")}
              placeholder="Child"
              min={1}
              max={4}
              className="flex-1 border border-black p-2 bg-white"
            />
          </div>
          <input
            type="date"
            className="flex-1 border border-black p-2 bg-white cursor-text"
          />
          <input
            type="date"
            className="flex-1 border border-black p-2 bg-white cursor-text"
          />
          <Button type="submit" btnText="search hotel" btnType="success" />
          <Button
            type="reset"
            btnText="reset"
            btnType="danger"
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
          />
        </form>
        {import.meta.env.MODE === "development" && (
          <DevTool control={formMethods.control} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
