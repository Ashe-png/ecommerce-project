const express = require("express");

const router1 = express.Router();

//middlewares
const {authCheck, adminCheck} = require("../middlewares/auth");

//controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");
const { Router } = require("express");



router1.post("/create-or-update-user", authCheck, createOrUpdateUser);
router1.post("/current-user", authCheck, currentUser);
router1.post("/current-admin", authCheck, adminCheck, currentUser);



module.exports = router1;