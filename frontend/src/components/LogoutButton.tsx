import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const LogoutButton = () => {
  const queryClient = useQueryClient(); // to invalidate the query "verify-token" so it refetches
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate: logOut } = useMutation({
    mutationFn: apiClient.logOut,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["verify-token"] });
      showToast({
        message: "you've been logged out successfully",
        type: "SUCCESS",
      });
      navigate("/");
    },
  });
  return (
    <button
      onClick={() => {
        logOut();
      }}
      className="text-white font-bold bg-red-800 py-2 px-4 text-base hover:bg-red-700"
    >
      logout
    </button>
  );
};

export default LogoutButton;
