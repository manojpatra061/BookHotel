import { useFormContext } from "react-hook-form";
import { HotelFormInput } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormInput>();
  return (
    <div>
      <label>
        <span className="font-bold">Facilities</span>
      </label>
      <div className="flex flex-row flex-wrap gap-4">
        {hotelFacilities.map((hotelFacility) => (
          <label key={hotelFacility}>
            <input
              type="checkbox"
              value={hotelFacility}
              {...register("facilities", {
                required: "This is a required field",
              })}
              className="mx-1"
            />
            {hotelFacility}
          </label>
        ))}
      </div>
      {errors.facilities ? (
        <span className="text-red-500 italic">{errors.facilities.message}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default FacilitiesSection;
