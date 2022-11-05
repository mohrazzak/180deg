const express = require(`express`);
const multer = require("multer");
const path = require("path");
const SchControllers = require(`../controllers/sch`);
const auth = require(`../middlewares/auth/auth`);
const isAdmin = require(`../middlewares/auth/is-admin`);
const router = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/sch");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

// Get all unis
router.get(`/`,auth, SchControllers.getAllSch);

// Get single uni
router.get(`/:id`,auth, SchControllers.getSch);

// Add new uni
router.post(`/new`,auth,isAdmin, upload.single("image"), SchControllers.newSch);

// Update uni
router.put(
  `/update/:id`,
  auth,
  isAdmin,
  upload.single("image"),
  SchControllers.updateSch
);

// Delete uni
router.delete(`/delete/:id`, auth, isAdmin, SchControllers.deleteSch);

module.exports = router;
