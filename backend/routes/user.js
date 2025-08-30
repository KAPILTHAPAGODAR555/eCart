const express = require("express");
const { signUp, login, contact } = require("../controllers/user");
const router = express.Router({mergeParams: true});

router.post("/signup", signUp);
router.post("/login", login);
router.post("/contact" , contact);
module.exports = router;