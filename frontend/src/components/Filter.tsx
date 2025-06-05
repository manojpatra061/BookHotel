import {
  FacilitiesFilter,
  MaxPriceFilter,
  StarRatingFilter,
  TypeFilter,
} from ".";

const Filter = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* <span className="text-xl font-bold">Filter by:</span> */}
      <StarRatingFilter />
      <TypeFilter />
      <FacilitiesFilter />
      <MaxPriceFilter />
    </div>
  );
};

export default Filter;
