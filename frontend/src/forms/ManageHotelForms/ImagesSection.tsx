import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <label>
        <span className="font-bold">Images</span>
      </label>
      <div className="border border-gray-300 p-4">
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("images", {
            validate: (inputImages) => {
              if (inputImages.length <= 0) {
                return "At least one 1 image is required";
              }
              if (inputImages.length > 5) {
                return "Images cannot be more than 5";
              }
            },
          })}
        />
        {errors.images ? (
          <span className="text-red-500 italic">{errors.images.message}</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ImagesSection;
