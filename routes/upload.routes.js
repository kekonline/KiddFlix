const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated")
const uploader = require("../middlewares/cloudinary.config.js");
const Parent = require("../models/Parent.model");

// POST "/api/upload"
router.post("/", isAuthenticated, uploader.single("image"), async (req, res, next) => {
    // console.log("file is: ", req.file);
    if (!req.file) {
        next("No file uploaded!");
        return;
    }
    res.json({ imageUrl: req.file.path });
});

module.exports = router;