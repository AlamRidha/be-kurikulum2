const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder penyimpanan file
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date()
        .toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "")}-${file.originalname}`
    );

    // cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter untuk mengizinkan hanya file PDF
const fileFilter = (req, file, cb) => {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: File upload hanya mendukung format PDF!");
  }
};

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Batasan ukuran file 10MB
  fileFilter: fileFilter,
});

module.exports = upload;
