import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLODNAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODUDINARY_API_SECRET,
});
export const uploadToCloudinaryLoggedUserImage = async (img: string) => {
  try {
    const result = await cloudinary.uploader.upload(img, {
      folder: "Denmark_official/loggedUsers",
    });
    return result;
  } catch (error) {
    throw new Error(String(error));
  }
};
