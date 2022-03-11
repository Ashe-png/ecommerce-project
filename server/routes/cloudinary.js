const express = require("express");
const router1 = express.Router();

//middlewares
const {authCheck, adminCheck} = require("../middlewares/auth");

//controllers
const {upload, remove} = require("../controllers/cloudinary");

router1.post('/uploadimages', authCheck, adminCheck, upload);
router1.post('/removeimage', authCheck, adminCheck, remove);

module.exports = router1;