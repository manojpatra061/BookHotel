import { FormProvider, useForm } from "react-hook-form";
import {
  DetailsSection,
  TypeSection,
  FacilitiesSection,
  GuestsSection,
  ImagesSection,
} from "./index";
import { useEffect } from "react";
import { HotelType } from "../../shared/types";
import { useLocation } from "react-router-dom";

export type HotelFormInput = {
  _id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  pricePerNight: number;
  starRating: number;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  images: FileList; // images will be uploaded in Cloudinary by backend
  imageUrls: string[]; //* needed for '/edit-hotel/hotelId' route - to watch
};

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isFormLoading: boolean;
  hotelValueForReset?: HotelType | "";
};

const ManageHotelForm = ({
  onSave,
  isFormLoading,
  hotelValueForReset = "",
}: Props) => {
  const { pathname } = useLocation();
  const idleButtonText = pathname.includes("/add-hotel")
    ? "create hotel"
    : pathname.includes("/edit-hotel")
    ? "update hotel"
    : "submit";
  const loadingButtonText = pathname.includes("/add-hotel")
    ? "creating hotel..."
    : pathname.includes("/edit-hotel")
    ? "updating hotel..."
    : "submitting...";
  // console.log("from ManageHotelForm component. pathname = ", pathname);

  const formMethods = useForm<HotelFormInput>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (hotelValueForReset) {
      reset(hotelValueForReset); // for '/edit-hotel/hotelId' route
    }
  }, [hotelValueForReset]);

  useEffect(() => {
    if (!isFormLoading) {
      reset(); // reset the form when hotel is created successfully. Setup is recommended by react-hook-form
    }
  }, [isFormLoading]);

  const onSubmit = (hotelFormInput: HotelFormInput) => {
    // console.log("from ManageHotelForm component. before toFormData. hotelFormInput: ", hotelFormInput);
    const formData = toFormData(hotelFormInput);
    // console.log("from ManageHotelForm component. after toFormData:", Object.fromEntries(formData.entries())); // NOTE: FormData is not directly printable in the console like plain objects.
    onSave(formData);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <button
          type="submit"
          disabled={isFormLoading}
          className="capitalize text-sm font-bold bg-blue-800 text-white w-fit p-2 self-end my-2 disabled:bg-gray-400"
        >
          {isFormLoading ? loadingButtonText : idleButtonText}
        </button>
      </form>
    </FormProvider>
  );
};

/**
 * Converts the object into FormData object
 * @param hotelFormInput - normal input object
 * @returns FormData object
 */
const toFormData = (hotelFormInput: HotelFormInput): FormData => {
  // type conversion : HotelFormInput -> FormData type because apiClient.addMyHotel, apiClient.updatHotelById (aka onSave) need FormData type
  const formData = new FormData(); //creating an empty FormData object
  if (hotelFormInput._id) {
    formData.append("_id", hotelFormInput._id); // NOTE: no need to add '_id' when creating hotel. Only needed for updating.
  }
  formData.append("name", hotelFormInput.name);
  formData.append("city", hotelFormInput.city);
  formData.append("country", hotelFormInput.country);
  formData.append("description", hotelFormInput.description);
  formData.append("pricePerNight", hotelFormInput.pricePerNight.toString());
  formData.append("starRating", hotelFormInput.starRating.toString());
  formData.append("type", hotelFormInput.type);
  formData.append("adultCount", hotelFormInput.adultCount.toString());
  formData.append("childCount", hotelFormInput.childCount.toString());

  if (hotelFormInput.imageUrls) {
    hotelFormInput.imageUrls.forEach((imageUrl) =>
      formData.append("imageUrls", imageUrl)
    );
  }

  hotelFormInput.facilities.forEach((facility) => {
    formData.append("facilities", facility);
  });

  const arrOfImageFiles = Array.from(hotelFormInput.images);
  arrOfImageFiles.forEach((imageFile) => formData.append("images", imageFile));

  return formData;
};

export default ManageHotelForm;
