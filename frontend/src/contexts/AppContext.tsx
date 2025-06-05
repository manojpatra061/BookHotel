import React, { createContext, useContext, useState } from "react";
import { Toast } from "@/components";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};
type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  isLogging: boolean; //to solve: shows 'you need to login' when already logged in at '/add-hotel'
  // for any other props
};

const AppContext = createContext<AppContextType | undefined>(undefined);

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
        isLogging: isPending,
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

  if (context) {
    return context;
  }

  if (import.meta.env.MODE === "development") {
    // ⚠️ Dev-only fallback to prevent crash during HMR or testing
    const fallBackContext: AppContextType = {
      isLoggedIn: false,
      isLogging: false,
      showToast: () => {},
    };
    return fallBackContext;
  }

  // ❌ In production, missing provider is a serious bug
  throw new Error("AppContext must be used within its provider.");
};

export default AppContextProvider;
