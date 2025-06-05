import { HotelType } from "@/shared/types";
import { FaStar } from "react-icons/fa";
import { LinkButton } from ".";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] grid-rows-[minmax(50px,200px)_auto] lg:grid-rows-[minmax(50px,250px)] gap-2 border-1 p-2 my-2 hover:shadow-2xl hover:shadow-gray-300">
      <div>
        {/* hotel images */}
        <img className="h-full m-auto" src={hotel.imageUrls[0]} />
      </div>
      <div className="grid grid-rows-[minmax(50px,auto)_1fr_auto] gap-1">
        {/* hotel title */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <span className="flex flex-row">
              {Array.from({ length: hotel.starRating }, (_, i) => i + 1).map(
                (_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-xl" />
                )
              )}
            </span>
            <span>{hotel.type}</span>
          </div>
          <h2 className="text-lg lg:text-3xl font-bold">{hotel.name}</h2>
        </div>
        {/* hotel description */}
        <div className="flex flex-col justify-between gap-1">
          <div className="line-clamp-5 lg:line-clamp-3 tracking-wide ">
            {hotel.description}
          </div>
          <span className="text-xs font-semibold w-fit bg-blue-200 underline rounded p-1 self-center lg:self-end">
            ₹ {hotel.pricePerNight} per night
          </span>
        </div>
        {/* CTA button */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-2">
          <div>
            {hotel.facilities.map((facility, i) => (
              <span
                key={i}
                className="text-xs font-semibold bg-gray-400 rounded m-1 px-2"
              >
                {facility}
              </span>
            ))}
          </div>
          <LinkButton
            linkTo={`/detail/${hotel._id}`}
            linkText="view"
            linkType="success"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
