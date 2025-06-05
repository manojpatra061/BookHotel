import { useSearchContext } from "@/contexts/SearchContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const StarRatingFilter = () => {
  // TODO: make the below 3 line more DRY
  const { setNewSearchInputs, ...searchInputs } = useSearchContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleStarRatingChange =
    (star: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchInputs = searchInputs;
      newSearchInputs.starRating = newSearchInputs.starRating || [];
      if (e.target.checked) {
        newSearchInputs.starRating.push(star);
        searchParams.append("starRating", star.toString());
      } else {
        newSearchInputs.starRating = newSearchInputs.starRating.filter(
          (starRateToDel) => starRateToDel !== star
        );
        searchParams.delete("starRating", star.toString());
      }
      newSearchInputs.page = undefined;
      setNewSearchInputs(newSearchInputs);
      searchParams.delete("page");
      navigate(`/search?${searchParams.toString()}`);
    };

  return (
    <div className="flex flex-col">
      <span className="text-lg font-semibold">Star rating</span>
      <ul>
        {[5, 4, 3, 2, 1].map((star) => (
          <li>
            <label className="hover:underline">
              {/* //NOTE: here I am calling the handleFn instead of passing its reference. Currying technique */}
              <input onChange={handleStarRatingChange(star)} type="checkbox" />
              <span className="mx-1">{star} Stars</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StarRatingFilter;
