import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <label className="flex flex-col">
        <span className="font-bold">Name</span>
        <input
          {...register("name", { required: "name is required" })}
          type="text"
          className="border border-black"
        />
        {errors.name ? (
          <span className="text-red-500 italic">{errors.name.message}</span>
        ) : (
          ""
        )}
      </label>
      <div className=" flex gap-4 flex-col lg:flex-row">
        <label className="flex flex-col flex-grow">
          <span className="font-bold">City</span>
          <input
            {...register("city", { required: "city is required" })}
            type="text"
            className="border border-black"
          />
          {errors.city ? (
            <span className="text-red-500 italic">{errors.city.message}</span>
          ) : (
            ""
          )}
        </label>
        <label className="flex flex-col flex-grow">
          <span className="font-bold">Country</span>
          <input
            {...register("country", { required: "country is required" })}
            type="text"
            className="border border-black"
          />
          {errors.country ? (
            <span className="text-red-500 italic">
              {errors.country.message}
            </span>
          ) : (
            ""
          )}
        </label>
      </div>
      <label className="flex flex-col">
        <span className="font-bold">Description</span>
        <textarea
          {...register("description", { required: "description is required" })}
          className="border border-black"
          rows={5}
        ></textarea>
        {errors.description ? (
          <span className="text-red-500 italic">
            {errors.description.message}
          </span>
        ) : (
          ""
        )}
      </label>
      <label className="flex flex-col">
        <span className="font-bold">Price per night</span>
        <input
          {...register("pricePerNight", {
            required: "price per night is required",
          })}
          type="number"
          className="border border-black"
        />
        {errors.pricePerNight ? (
          <span className="text-red-500 italic">
            {errors.pricePerNight.message}
          </span>
        ) : (
          ""
        )}
      </label>
      <label className="flex flex-col">
        <span className="font-bold">Star rating</span>
        <select className="border border-black"
          {...register("starRating", {
            required: "This field is a required field",
          })}
        >
          <option value="">select star rating</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        {errors.starRating ? (
          <span className="text-red-500 italic">
            {errors.starRating.message}
          </span>
        ) : (
          ""
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
