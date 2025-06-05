import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { FaRegBuilding, FaStarHalfAlt } from "react-icons/fa";
import { MdFamilyRestroom, MdOutlineFeaturedPlayList } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { Link } from "react-router-dom";
import { LinkButton } from "@/components";

const MyHotels = () => {
  const { data: myHotels } = useQuery({
    queryKey: ["my-hotels"],
    queryFn: apiClient.fetchAllMyHotels,
  });

  if (!myHotels) {
    return <div>you don't have any hotels...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">My Hotels</h1>
      {myHotels.map((hotel, i) => (
        <div
          key={i}
          className="rounded-md border-black border p-4 flex flex-col gap-4 my-4"
        >
          <h2 className="text-2xl font-bold">{hotel.name}</h2>
          <div className="text-xl whitespace-pre-line">{hotel.description}</div>
          <div className="grid grid-cols-5 gap-4">
            <div className="border rounded flex flex-row gap-2">
              <FaRegBuilding className="text-2xl" />
              {hotel.city}, {hotel.country}
            </div>
            <div className="border rounded flex flex-row gap-2">
              <MdOutlineFeaturedPlayList className="text-2xl" />
              {hotel.type}
            </div>
            <div className="border rounded flex flex-row gap-2">
              <RiMoneyRupeeCircleFill className="text-2xl" />
              {hotel.pricePerNight}/night
            </div>
            <div className="border rounded flex flex-row gap-2">
              <MdFamilyRestroom className="text-2xl" />
              {hotel.adultCount} adults, {hotel.childCount} children
            </div>
            <div className="border rounded flex flex-row gap-2">
              <FaStarHalfAlt className="text-2xl" />
              {hotel.starRating} star rating
            </div>
          </div>
          <LinkButton
            linkTo={`/edit-hotel/${hotel._id}`}
            linkText="edit hotel"
            linkType="success"
            additionalClassName="self-end"
          />
        </div>
      ))}
    </div>
  );
};

export default MyHotels;
