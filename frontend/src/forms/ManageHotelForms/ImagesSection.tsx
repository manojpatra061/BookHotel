import { useFormContext } from "react-hook-form";
import { HotelFormInput } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormInput>();

  const existingImageUrls = watch("imageUrls") || [];
  register("imageUrls"); // dynamically registering a field 'imageUrls'.
  // console.log("from ImageSection component. existingImageUrls = ", existingImageUrls);

  return (
    <div>
      <label>
        <span className="font-bold">Images</span>
      </label>
      <div className="border border-gray-300 p-4">
        {existingImageUrls.length > 0 && (
          <div className="m-4 grid grid-cols-5 gap-1">
            {existingImageUrls.map((imageUrl, i) => (
              <div key={i} className="group relative">
                <img
                  src={imageUrl}
                  alt={`hotel-image-${i}`}
                  className="border border-dashed border-black"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const newImageUrls = deleteUrlFromImageUrls(
                      imageUrl,
                      existingImageUrls
                    );
                    setValue("imageUrls", newImageUrls); // NOTE: You cannot change the existingImageUrls directly by assigning the new value using assignment operator (=) thats why need to use setValue
                  }}
                  className="opacity-0 text-xl capitalize font-bold absolute inset-0 group-hover:opacity-70 group-hover:bg-black group-hover:text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("images", {
            validate: (inputImages) => {
              if (existingImageUrls.length + inputImages.length <= 0) {
                return "At least one 1 image is required";
              }
              if (existingImageUrls.length + inputImages.length > 5) {
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

/**
 * Deletes a specific URL from an array of image URLs.
 * @param imageUrlToDelete - The URL of the image to delete.
 * @param existingImageUrls - The existing image URLs to delete from.
 * @returns A new array of image URLs excluding the specified URL.
 */
const deleteUrlFromImageUrls = (
  imageUrlToDelete: string,
  existingImageUrls: string[]
): string[] => {
  const newImageUrls = existingImageUrls.filter(
    (url) => url !== imageUrlToDelete
  );
  return newImageUrls;
};

export default ImagesSection;
