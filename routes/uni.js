const express = require(`express`);
const multer = require(`multer`);
const path = require("path");
const uniControllers = require(`../controllers/uni`);
const auth = require(`../middlewares/auth/auth`);
const isAdmin = require(`../middlewares/auth/is-admin`);
const router = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/uni");
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
router.get(`/`, auth, uniControllers.getAllUnis);

// Get single uni
router.get(`/:id`, auth, uniControllers.getUni);

// Get all uni information
router.get(`/info/:id`, auth, uniControllers.getUniInfo);

// Add new uni
router.post(
  `/new`,
  auth,
  isAdmin,
  upload.single("image"),
  uniControllers.newUni
);

// Update uni
router.put(
  `/update/:id`,
  auth,
  isAdmin,
  upload.single("image"),
  uniControllers.updateUni
);

// Delete uni
router.delete(`/delete/:id`, auth, isAdmin, uniControllers.deleteUni);

module.exports = router;
