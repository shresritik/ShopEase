import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";

// Helper function to check if file is an image
const isImage = (mimeType: string): boolean => {
  return mimeType.startsWith("image/");
};

// Storage configuration for profile pictures
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const profileDir = path.join(__dirname, "../../uploads/profile");
    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, { recursive: true });
    }
    cb(null, profileDir); // Directory to store profile pictures
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// Storage configuration for product images
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const productDir = path.join(__dirname, "../../uploads/products");
    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true });
    }
    cb(null, productDir); // Directory to store product images
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// Multer instance for profile picture uploads with image filter
export const uploadProfile = multer({
  storage: profileStorage,
  fileFilter: (req, file, cb: FileFilterCallback) => {
    if (isImage(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// Multer instance for product image uploads with image filter
export const uploadProduct = multer({
  storage: productStorage,
  fileFilter: (req, file, cb: FileFilterCallback) => {
    if (isImage(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});
