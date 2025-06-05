// npm run e2e
// prepare the dummy data (based on HotelType)

// connect to the db - done
// use HotelModel to insert the dummy data - log each hotel name when it's inserted sucessfully.

import connectDB from "./db";
import HotelModel from "./models/hotel";
import { HotelType } from "./shared/types";

const dummyHotels: HotelType[] = [
  {
    name: "Sunset Retreat",
    city: "Sambalpur",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Oceanic Bliss",
    city: "Jaipur",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Palm Breeze Hotel",
    city: "Delhi",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Royal Orchid Stay",
    city: "Mumbai",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Mountain View Inn",
    city: "Chennai",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Golden Lotus Hotel",
    city: "Sambalpur",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "The Sapphire Place",
    city: "Jaipur",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Luxe Horizon",
    city: "Delhi",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "The Grand Royale",
    city: "Mumbai",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Whispering Pines",
    city: "Chennai",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Blue Moon Residency",
    city: "Sambalpur",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Crimson Cloud Resort",
    city: "Jaipur",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Cedar Heights",
    city: "Delhi",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "White Pearl Stay",
    city: "Mumbai",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
  {
    name: "Tranquil Bay Inn",
    city: "Chennai",
    userId: "67da776e47dda319a8d25c34",
    adultCount: 2,
    childCount: 1,
    country: "India",
    starRating: 4,
    type: "All Inclusive",
    facilities: ["Free WiFi", "Parking"],
    imageUrls: [
      "https://res.cloudinary.com/dh06lj3g0/image/upload/v1743614686/book-hotel/vbkrbmv3sysdpy508yjk.jpg",
    ],
    pricePerNight: 800,
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary...",
  },
];

const connectionString = ''

const start = async () => {
  await connectDB(connectionString);
  for (const dummyHotel of dummyHotels) {
    const hotelDoc = new HotelModel(dummyHotel);
    await hotelDoc.save();
    console.log(`${hotelDoc.name} inserted...`);
  }
  console.log("finish inserting dummy data...");
};

// start();
