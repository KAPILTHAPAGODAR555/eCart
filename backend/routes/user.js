const express = require("express");
const { signUp, login, contact, updateProfilePhoto, getProfileInfo } = require("../controllers/user");
const router = express.Router({mergeParams: true});
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limit: {
        fileSize: 5*1024*1024
    }
})

router.post("/signup", signUp);
router.post("/update_profile_photo" , upload.single('profileImage') , updateProfilePhoto);
router.get("/profile_info" , getProfileInfo);
router.post("/login", login);
router.post("/contact" , contact);
module.exports = router;