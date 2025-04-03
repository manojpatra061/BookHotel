import { FormProvider, useForm } from "react-hook-form";
import {
  DetailsSection,
  TypeSection,
  FacilitiesSection,
  GuestsSection,
  ImagesSection,
} from "./index";

export type HotelFormData = {
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
  images: FileList; //images will be uploaded in Cloudinary by backend
};

type Props = {
  onSave: (formData: FormData) => void; //function will be defined or sent when using the ManageHotelForm component
};

const ManageHotelForm = ({ onSave }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = (hotelFormData: HotelFormData) => {
    // console.log("before toFormData:", hotelFormData);
    const formData = toFormData(hotelFormData);
    // console.log("after toFormData:", Object.fromEntries(formData.entries()));
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
          className="text-sm font-bold bg-blue-800 text-white w-fit p-2 self-end my-2"
        >
          Create Hotel
        </button>
      </form>
    </FormProvider>
  );
};

const toFormData = (hotelFormData: HotelFormData): FormData => {
  // type conversion : HotelFormData -> FormData type because apiClient.addMyHotel (aka onSave) needs FormData type
  const formData = new FormData(); //creating an empty FormData object
  formData.append("name", hotelFormData.name);
  formData.append("city", hotelFormData.city);
  formData.append("country", hotelFormData.country);
  formData.append("description", hotelFormData.description);
  formData.append("pricePerNight", hotelFormData.pricePerNight.toString());
  formData.append("starRating", hotelFormData.starRating.toString());
  formData.append("type", hotelFormData.type);
  formData.append("adultCount", hotelFormData.adultCount.toString());
  formData.append("childCount", hotelFormData.childCount.toString());

  hotelFormData.facilities.forEach((facility) => {
    formData.append("facilities", facility);
  });

  const arrOfImageFiles = Array.from(hotelFormData.images);
  arrOfImageFiles.forEach((imageFile) => formData.append("images", imageFile));

  return formData;
};

export default ManageHotelForm;
