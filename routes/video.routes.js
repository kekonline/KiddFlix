const router = require("express").Router();
const Video = require("../models/Video.model")

// GET /api/video/unwatched/:childid - Get all unwatched videos of a specific child
router.get("/unwatched/:childid", async (req, res, next) => {
    try {
        const AllUnwatchedVideosOfChild = await Video.find({ child: req.params.childid, watched: false });
        res.json(AllUnwatchedVideosOfChild);
    } catch (error) {
        next(error);
    }
})

// GET /api/video/latest/:childid - Get all latest videos of a specific child
router.get("/latest/:childid", async (req, res, next) => {
    try {
        const AllLatestVideosOfChild = await Video.find({ child: req.params.childid }).sort({ dateAdded: -1 });
        res.json(AllLatestVideosOfChild);
    } catch (error) {
        next(error);
    }
})

// GET /api/video/random/:childid - Get 20 random video of a specific child
router.get("/random/:childid", async (req, res, next) => {

    //! FIX HOW TO GET 20 RANDOM VIDEOS OF A SPECIFIC CHILD
    try {
        const AllRandomVideosOfChild = await Video.find({ child: req.params.childid }).limit(20);
        res.json(AllRandomVideosOfChild);
    } catch (error) {
        next(error);
    }
})

//GET /api/video/:videoid - Get information about a specific video
router.get("/:videoid", async (req, res, next) => {
    try {
        const videoInfo = await Video.findById(req.params.videoid);
        res.json(videoInfo);
    } catch (error) {
        next(error);
    }
})

//DELETE /api/video/:videoid - Delete a specific video
router.delete("/:videoid", async (req, res, next) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.videoid);
        res.json(deletedVideo);
    } catch (error) {
        next(error);
    }
})

//PUT /api/video/:videoid - Update a specific video
router.put("/:videoid", async (req, res, next) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(req.params.videoid, {
            link: req.body.link,
            watched: req.body.watched
        }, { new: true });
        res.json(updatedVideo);
    } catch (error) {
        next(error);
    }
})

//POST /api/video/new/:videoid - Create a new video of a specific playlist
router.post("/new/:playlistid", async (req, res, next) => {
    try {
        const newVideo = await Video.create({
            link: req.body.link,
            watched: req.body.watched,
            playlist: req.params.playlistid
        });
        res.json(newVideo);
    } catch (error) {
        next(error);
    }
})

module.exports = router