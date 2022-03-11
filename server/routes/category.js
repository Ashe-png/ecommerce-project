const express = require("express");

const router1 = express.Router();

//middlewares
const {authCheck, adminCheck} = require("../middlewares/auth");

//controller
const { create, read, update, remove, list, getSubs} = require("../controllers/category");
const { Router } = require("express");


//routes
router1.post('/category', authCheck, adminCheck, create);
router1.get('/categories', list);
router1.get('/category/:slug', read);
router1.put('/category/:slug', authCheck, adminCheck, update);
router1.delete('/category/:slug', authCheck, adminCheck, remove);
router1.get('/category/subs/:_id',getSubs);

module.exports = router1;