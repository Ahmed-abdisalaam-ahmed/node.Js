import multer from "multer";

// waxaynu isticmalaynaa storage-keena ama serverka storage kiisa
const storage = multer.memoryStorage();

export const upload = multer ({
    storage,
    limits: {fileSize: 10 * 1024 * 1024} // 10 MB
})