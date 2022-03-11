const express = require("express");

const router1 = express.Router();

//middlewares
const {authCheck, adminCheck} = require("../middlewares/auth");

//controller
const { create, read, update, remove, list } = require("../controllers/sub");
const { Router } = require("express");


//routes
router1.post('/sub', authCheck, adminCheck, create);
router1.get('/subs', list);
router1.get('/sub/:slug', read);
router1.put('/sub/:slug', authCheck, adminCheck, update);
router1.delete('/sub/:slug', authCheck, adminCheck, remove);

module.exports = router1;