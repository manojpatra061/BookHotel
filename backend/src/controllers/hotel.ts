import multer from "multer";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import HotelModel from "../models/hotel";
import { HotelType } from "../shared/types";
import { StatusCodes } from "http-status-codes";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const handleMultipartFormData = upload.array("images", 5);

export const createHotel = async (req: Request, res: Response) => {
  try {
    // thanks to multer multipart/form-data coming from fend are in req.files, req.body - done
    // upload the image files into Cloudinary and get the url string - done
    // create new hotel document and save it in database - done
    const imageFiles = req.files;
    if (!imageFiles) {
      res.json({ msg: "no files were sent" });
      return;
    }

    const imageUrls = await uploadImagesToCloudinary(
      imageFiles as Express.Multer.File[]
    );

    const newHotel: HotelType = req.body;
    newHotel.imageUrls = imageUrls;
    newHotel.userId = req.userId;

    const newHotelDoc = new HotelModel<HotelType>(newHotel);
    await newHotelDoc.save();

    res.status(StatusCodes.CREATED).json({ msg: "new hotel created" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "error while creating hotel" });
  }
};

const uploadImagesToCloudinary = async (
  images: Express.Multer.File[]
): Promise<string[]> => {
  // takes an array of images and upload to Cloudinary and returns an array of image urls
  const uploadResponses = images.map((image) => {
    const b64 = image.buffer.toString("base64");
    const dataUri = `data:image/png;base64,${b64}`; // convert into base64 uri

    const uploadResponse = cloudinary.uploader.upload(dataUri, {
      folder: "book-hotel",
    });
    return uploadResponse;
  });
  const uploadedImages = await Promise.all(uploadResponses);
  const uploadedImageUrls = uploadedImages.map(
    (uploadedImage) => uploadedImage.secure_url
  );
  return uploadedImageUrls;
};

export const getAllMyHotels = async (req: Request, res: Response) => {
  try {
    // get the userId from req - done
    // find all hotel documents with the userId from HotelModel (aka hotels collection) - done
    // return the hotel documents with a success message - done
    const userId = req.userId;
    const hotelDocs = await HotelModel.find({ userId });
    res.status(StatusCodes.OK).json({ msg: "success", myHotels: hotelDocs });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "error finding hotels..." });
  }
};

export const getMyHotel = async (req: Request, res: Response) => {
  try {
    // get userId and hotelId from req and req.params -  done
    // find the document with hotelId and userId matched, from HotelModel aka hotels collection - done
    // if found send hotel with a success message - done
    // if not found send - notfound message - done
    const {
      userId,
      params: { hotelId },
    } = req;
    const hotelDoc = await HotelModel.findOne<HotelType>({
      _id: hotelId,
      userId,
    });
    if (!hotelDoc) {
      throw new Error("no hotel with the hotelId found...");
    }
    res.status(StatusCodes.OK).json({ msg: "hotel found", hotel: hotelDoc });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
    }
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "something went wrong finding hotel" });
  }
};
