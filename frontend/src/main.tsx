import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppContextProvider from "./contexts/AppContext.tsx";
import SearchContextProvider from "./contexts/SearchContext.tsx";

const queryClient = new QueryClient({
  // settings for all queries
  defaultOptions: {
    queries: {
      retry: false, //todo : set to 2 - retry any failed query 2 times only
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      gcTime: 1000 * 15,
      staleTime: 1000 * 10, //todo: will delete or set
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AppContextProvider>
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </StrictMode>
);
