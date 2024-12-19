import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  // for any other props
};

const AppContext = createContext<AppContext | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError, isPending } = useQuery({
    queryKey: ["verify-token"],
    queryFn: apiClient.verifyToken,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        // isLoggedIn: !isError, //after logout or no cookie in application, it shows the after login things for few seconds(fetching time)
        isLoggedIn: isPending ? false : isError ? false : true, //solved - keeping it to false when fetching
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => {
            setToast(undefined);
          }}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};

export default AppContextProvider;
