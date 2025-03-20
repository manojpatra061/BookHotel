export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface HotelType {
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  pricePerNight: number;
  starRating: number;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  imageUrls: string[];
}
