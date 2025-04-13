import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const { data: hotel, isLoading } = useQuery({
    queryKey: ["hotelId", hotelId],
    queryFn: () => apiClient.fetchHotelById(hotelId as string),
  });

  const { mutate: updateHotelById, isPending } = useMutation({
    mutationFn: apiClient.updateHotelById,
    onSuccess: () => {
      showToast({ message: "hotel updated", type: "SUCCESS" });
      queryClient.invalidateQueries({ queryKey: ["hotelId", hotelId] });
    },
    onError: () => {
      showToast({ message: "hotel update failed", type: "ERROR" });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container m-auto">
      <h1 className="text-2xl font-bold">Edit Hotel</h1>
      <ManageHotelForm
        hotelValueForReset={hotel}
        onSave={updateHotelById}
        isFormLoading={isPending}
      />
    </div>
  );
};

export default EditHotel;

// when this compoment renders it will first fetch the hotel by hotelId - done
// then show the fetched hotel data inside the form fields - reseting the form with hotel value - reseting the form with hotel value doesn't set the image uploads because they are FileList(images) not string[](imageUrls) -
// when clicking the submit type button it should update the hotel with the new updated value
