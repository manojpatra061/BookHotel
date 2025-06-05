"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHotel = exports.handleMultipartFormData = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const hotel_1 = __importDefault(require("../models/hotel"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
exports.handleMultipartFormData = upload.array("images", 5);
const createHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // thanks to multer multipart/form-data coming from fend are in req.files, req.body - done
        // upload the image files into Cloudinary and get the url string - done
        // create new hotel document and save it in database - done
        const imageFiles = req.files;
        if (!imageFiles) {
            res.json({ msg: "no files were sent" });
            return;
        }
        const imageUrls = yield uploadImagesToCloudinary(imageFiles);
        const newHotel = req.body;
        newHotel.imageUrls = imageUrls;
        newHotel.userId = req.userId;
        const newHotelDoc = new hotel_1.default(newHotel);
        yield newHotelDoc.save();
        res.json({ msg: "new hotel created" });
    }
    catch (error) {
        res.status(400).json({ msg: "error while creating hotel" });
    }
});
exports.createHotel = createHotel;
const uploadImagesToCloudinary = (images) => __awaiter(void 0, void 0, void 0, function* () {
    // takes an array of images and upload to Cloudinary and returns an array of image urls
    const uploadResponses = images.map((image) => {
        const b64 = image.buffer.toString("base64");
        const dataUri = `data:image/png;base64,${b64}`; // convert into base64 uri
        const uploadResponse = cloudinary_1.v2.uploader.upload(dataUri, {
            folder: "book-hotel",
        });
        return uploadResponse;
    });
    const uploadedImages = yield Promise.all(uploadResponses);
    const uploadedImageUrls = uploadedImages.map((uploadedImage) => uploadedImage.secure_url);
    return uploadedImageUrls;
});
