const cloudinary = require('cloudinary').v2
require('dotenv').config();


cloudinary.config({
    cloud_nameE:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})

module.exports = {cloudinary};