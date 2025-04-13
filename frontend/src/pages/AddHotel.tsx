import { useMutation, useQueryClient } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const { mutate: addMyHotel, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: "hotel created", type: "SUCCESS" });
      queryClient.invalidateQueries({ queryKey: ["my-hotels"] });
    },
    onError: () => {
      showToast({ message: "failed to create hotel", type: "ERROR" });
    },
  });

  return (
    <div className="container m-auto">
      <h1 className="text-2xl font-bold">Add Hotel</h1>
      <ManageHotelForm onSave={addMyHotel} isFormLoading={isPending} />
    </div>
  );
};

export default AddHotel;
