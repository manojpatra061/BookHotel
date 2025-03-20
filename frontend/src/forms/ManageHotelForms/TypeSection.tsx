import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  let typeValue = watch("type");
  let styleForAll = "bg-gray-200 px-4 py-2 rounded-3xl";
  let styleForSelected = "bg-blue-400 px-4 py-2 rounded-3xl";
  return (
    <div>
      <label>
        <span className="font-bold">Type</span>
      </label>
      <div className="flex flex-row flex-wrap gap-4">
        {hotelTypes.map((hotelType) => (
          // radio lets us select only one out of all
          <label
            className={hotelType === typeValue ? styleForSelected : styleForAll}
            key={hotelType}
          >
            <input
              type="radio"
              {...register("type", { required: "This field is required" })}
              value={hotelType}
              className="hidden"
            />
            {hotelType}
          </label>
        ))}
      </div>
      {errors.type ? (
        <span className="text-red-500 italic">{errors.type.message}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default TypeSection;
