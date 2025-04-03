import { LoginFormInput } from "./pages/Login";
import { RegisterFormInput } from "./pages/Register";
import { HotelType } from "./shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""; //best-practice : fallback to blank string ('')

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

export const apiTest = async () => {
  const response = await fetch(`${API_BASE_URL}/api/test/try`);
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
