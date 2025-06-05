import { SearchInputsType } from "./contexts/SearchContext";
import { LoginFormInput } from "./pages/Login";
import { RegisterFormInput } from "./pages/Register";
import { HotelType, SearchResultType } from "./shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""; //best-practice : fallback to blank string ('')

export const apiTest = async () => {
  const response = await fetch(`${API_BASE_URL}/api/test/try`);
  const data = response.json();
  return data;
};

export const registerUser = async (newUser: RegisterFormInput) => {
  // send {firstName,lastName,email,password} in post body
  const { firstName, lastName, email, password } = newUser;
  const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export const verifyToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("invalid token");
  }
  const data = response.json();
  return data;
};

export const logOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("failed to logout");
  }
  const data = response.json();
  return data;
};

export const logIn = async (user: LoginFormInput) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("login failed try again");
  }
  const data = response.json();
  return data;
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    body: hotelFormData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("failed to add hotel");
  }
  const data = await response.json();
  return data;
};

export const fetchAllMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("error fetching hotels");
  }
  const { myHotels } = await response.json();
  return myHotels;
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("error fetching hotel");
  }
  const { hotel } = await response.json();
  return hotel;
};

/**
 * @param hotelFormData - multipart/form-data aka FormData.
 */
export const updateHotelById = async (hotelFormData: FormData) => {
  // PUT request - for endpoint 'api/my-hotel/:hotelId'
  const hotelId = hotelFormData.get("_id");
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    method: "PUT",
    body: hotelFormData,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("error updating hotel");
  }
  const data = await response.json();
  return data;
};

export const searchHotels = async (
  searchInputs: SearchInputsType
): Promise<SearchResultType> => {
  // construct query string with these keys(page, destination, maxPrice, adultCount, childCount, facilities, type, starRating) - done
  // fetch GET request at api/hotels/search?query-string - done
  // return the data - done
  const {
    destination,
    adultCount,
    childCount,
    page,
    type,
    maxPrice,
    starRating,
    facilities,
    sort,
  } = searchInputs;
  const params = new URLSearchParams();
  if (destination) {
    params.append("destination", destination);
  }
  if (adultCount) {
    params.append("adultCount", adultCount.toString());
  }
  if (childCount) {
    params.append("childCount", childCount.toString());
  }
  if (page) {
    params.append("page", page.toString());
  }
  if (type) {
    type.forEach((typ) => params.append("type", typ));
  }
  if (maxPrice) {
    params.append("maxPrice", maxPrice.toString());
  }
  if (starRating) {
    starRating.forEach((starRate) =>
      params.append("starRating", starRate.toString())
    );
  }
  if (facilities) {
    facilities.forEach((facility) => params.append("facilities", facility));
  }
  if (sort) {
    params.append("sort", sort);
  }
  const queryString = params.toString();

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryString}`
  );
  if (!response.ok) {
    throw new Error("error while searching hotels");
  }
  const searchResultData: SearchResultType = await response.json();
  return searchResultData;
};
