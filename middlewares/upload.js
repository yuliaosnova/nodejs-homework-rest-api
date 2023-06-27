const multer = require("multer");
const path = require("path");

const destination = path.resolve("temp"); // підставляє шлях до корня проекту

const storage = multer.diskStorage({
  destination, // адреса тимчасової папки
  filename: (req, file, cb) => {
    const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const { originalname } = file;
    const filename = `${uniquePreffix}_${originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
