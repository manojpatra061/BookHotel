import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <label>
        <span className="font-bold">Guests</span>
      </label>
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-center p-4 bg-gray-300">
        <div className="flex flex-col w-full">
          <label>Adults</label>
          <input
            type="number"
            {...register("adultCount", {
              required: "This is a required field",
            })}
          />
          {errors.adultCount ? (
            <span className="text-red-500 italic">
              {errors.adultCount.message}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col w-full">
          <label>Children</label>
          <input
            type="number"
            {...register("childCount", {
              required: "This is a required field",
            })}
          />
          {errors.childCount ? (
            <span className="text-red-500 italic">
              {errors.childCount.message}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestsSection;
