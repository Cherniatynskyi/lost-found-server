import multer from "multer";
import path from "path";

const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    console.log(file, "AAAAAAAABBBBBBB")
    cb(null, file.originalname);
    req.file = file
  },
});

const upload = multer({
  storage: multerConfig,
});

export default upload;