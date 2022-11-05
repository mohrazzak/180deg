const express = require(`express`);

const majControllers = require(`../controllers/maj`);
const auth = require(`../middlewares/auth/auth`);
const isAdmin = require(`../middlewares/auth/is-admin`);
const router = express.Router();

// Get all unis
router.get(`/`,auth, majControllers.getAllMaj);

// Get single uni
router.get(`/:id`, auth, majControllers.getMaj);

// Add new uni
router.post(`/new`, auth,isAdmin, majControllers.newMaj);

// Update uni
router.put(`/update/:id`, auth, isAdmin, majControllers.updateMaj);

// Update uni
router.delete(`/delete/:id`, auth, isAdmin, majControllers.deleteMaj);

// link uni major
router.post(`/link`, auth, isAdmin, majControllers.linkUniMajor);

// unlink uni major
router.delete(`/unlink`, auth, isAdmin, majControllers.unLinkUniMajor);

module.exports = router;
