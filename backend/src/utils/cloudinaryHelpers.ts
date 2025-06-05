import { v2 as cloudinary } from "cloudinary";

/** Uploads images in your Couldinary account
 * @param images - an array of images to upload into Cloudinary
 * @returns - an array of image urls
 */
export const uploadImagesToCloudinary = async (
  images: Express.Multer.File[]
): Promise<string[]> => {
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
