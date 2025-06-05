export interface HotelType {
  _id: string;
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

export type SearchResultType = {
  msg: string;
  totalFound: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    hotelsPerPage: number;
  };
  hotels: HotelType[];
};
