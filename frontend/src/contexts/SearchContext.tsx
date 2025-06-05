import React, { createContext, useContext, useState } from "react";
import { HotelType } from "../shared/types";

type Props = {
  children: React.ReactNode;
};

export type SearchInputsType = Partial<
  Pick<HotelType, "adultCount" | "childCount" | "facilities"> & {
    type: string[];
    starRating: number[];
    destination: string;
    maxPrice: number;
    page: number;
    sort: string;
    // * may add checkIn and checkOut later
  }
>;

type SearchContextType = SearchInputsType & {
  setNewSearchInputs: (newSearchInputs: SearchInputsType) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const initialSearchInputs: SearchInputsType = {
  adultCount: undefined,
  childCount: undefined,
  destination: undefined,
  facilities: undefined,
  maxPrice: undefined,
  page: undefined,
  starRating: undefined,
  type: undefined,
};

const SearchContextProvider = ({ children }: Props) => {
  const [searchInputs, setSearchInputs] =
    useState<SearchInputsType>(initialSearchInputs);

  return (
    <SearchContext.Provider
      value={{
        ...searchInputs,
        setNewSearchInputs: (newSearchInputs) => {
          setSearchInputs(newSearchInputs);
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const searchContext = useContext(SearchContext);
  return searchContext as SearchContextType;
};
export default SearchContextProvider;
