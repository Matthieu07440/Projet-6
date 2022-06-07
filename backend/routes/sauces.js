const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const sauceControl = require('../controllers/sauces');
const likeCtrl = require("../controllers/like");


router.post("/",auth, multer, sauceControl.createSauce);
router.put("/:id",auth, multer, sauceControl.modifySauce);
router.delete("/:id",auth, sauceControl.deleteSauce);
router.get("/:id",auth, sauceControl.getOneSauce);
router.get("/",auth, sauceControl.getAllSauce);
router.post("/:id/like", auth, likeCtrl.likeSauce);
module.exports = router;