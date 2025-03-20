import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate: addMyHotel } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: "hotel created", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "failed to create hotel", type: "ERROR" });
    },
  });

  return (
    <div className="container m-auto">
      <h1 className="text-2xl font-bold">Add Hotel</h1>
      <ManageHotelForm onSave={addMyHotel} />
    </div>
  );
};

export default AddHotel;
