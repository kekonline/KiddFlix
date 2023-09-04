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

    // get the URL of the uploaded file and send it as a response.
    // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

    // try {
    //     const newParentInfo = await Parent.findByIdAndUpdate(req.payload._id, { picture: req.file.path }, { new: true });
    //     // res.json(newParentInfo);
    // } catch (error) {
    //     next(error);
    // }

    res.json({ imageUrl: req.file.path });
});

module.exports = router;