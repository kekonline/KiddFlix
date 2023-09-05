const router = require("express").Router();
const Video = require("../models/Video.model");
const Playlist = require("../models/Playlist.model");

const isAuthenticated = require("../middlewares/isAuthenticated")


// GET /api/video/unwatched/:childid - Get all unwatched videos of a specific child
router.get("/unwatched/:childid", isAuthenticated, async (req, res, next) => {
    // console.log("in unwatched", req.params.childid);

    try {
        const AllUnwatchedVideosOfChild = await Playlist.find({
            child: req.params.childid,
        }).populate("video");

        // console.log(AllUnwatchedVideosOfChild);

        const onlySpreadedVideos = [];

        AllUnwatchedVideosOfChild.forEach((eachPlaylist) => {
            onlySpreadedVideos.push(...eachPlaylist.video);
        });

        const onlyUnWatchedVideos = onlySpreadedVideos.filter((eachVideo) => {
            console.log(eachVideo);
            if (eachVideo.watched === false) {
                return true;
            }
        });

        // console.log(onlyUnWatchedVideos);

        res.json(onlyUnWatchedVideos);
    } catch (error) {
        next(error);
    }
});

// GET /api/video/latest/:childid - Get all latest videos of a specific child
router.get("/latest/:childid", isAuthenticated, async (req, res, next) => {

    console.log("latest", req.params.childid);


    try {
        const AllLatestVideosOfChild = await Playlist.find({
            child: req.params.childid,
        }).populate("video");

        // console.log(AllLatestVideosOfChild);

        const onlySpreadedVideos = [];

        AllLatestVideosOfChild.forEach((eachPlaylist) => {
            onlySpreadedVideos.push(...eachPlaylist.video);
        });

        const sortedVideos = onlySpreadedVideos.sort((a, b) => {
            if (a.dateAdded < b.dateAdded) return 1;
            if (a.dateAdded > b.dateAdded) return -1;
            if (a.dateAdded === b.dateAdded) return 0;
        });


        console.log(sortedVideos);


        res.json(sortedVideos);
    } catch (error) {
        next(error);
    }
});

// GET /api/video/random/:childid - Get 20 random video of a specific child
router.get("/random/:childid", isAuthenticated, async (req, res, next) => {

    try {
        const AllRandomVideosOfChild = await Playlist.find({
            child: req.params.childid,
        }).populate("video");
        const onlySpreadedVideos = [];
        AllRandomVideosOfChild.forEach((eachPlaylist) => {
            onlySpreadedVideos.push(...eachPlaylist.video);
        });
        const randomVideos = onlySpreadedVideos.sort(() => {
            return Math.random() - 0.5
        });
        console.log(randomVideos);
        res.json(randomVideos);
    } catch (error) {
        next(error);
    }
});











// GET /api/video/favorite/:childid - Get 20 random video of a specific child
router.get("/favorite/:childid", isAuthenticated, async (req, res, next) => {

    try {
        const allPlaylistsOfChild = await Playlist.find({
            child: req.params.childid,
        }).populate("video");
        const onlySpreadedVideos = [];
        allPlaylistsOfChild.forEach((eachPlaylist) => {
            onlySpreadedVideos.push(...eachPlaylist.video);
        });

        const onlyFavoriteVideos = onlySpreadedVideos.filter((eachVideo) => {

            if (eachVideo.favorite === true) {


                return true
            }
            // console.log(eachVideo.favorite)


        });
        // console.log(onlyFavoriteVideos);
        res.json(onlyFavoriteVideos);
    } catch (error) {
        next(error);
    }
});





















//GET /api/video/:videoid - Get information about a specific video
router.get("/:videoid", isAuthenticated, async (req, res, next) => {
    try {
        const videoInfo = await Video.findById(req.params.videoid);
        res.json(videoInfo);
    } catch (error) {
        next(error);
    }
});

//DELETE /api/video/:videoid - Delete a specific video
router.delete("/:videoid", isAuthenticated, async (req, res, next) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.videoid);
        res.json(deletedVideo);
    } catch (error) {
        next(error);
    }
});


//PUT /api/video/star/:videoid - Update a specific video
router.put("/star/:videoid", isAuthenticated, async (req, res, next) => {


    try {

        updatedVideo = await Video.findByIdAndUpdate(
            req.params.videoid,
            {

                favorite: req.body.favorite,
            },
            { new: true }
        );

        console.log(updatedVideo)

        res.json(updatedVideo);


    } catch (error) {
        next(error);
    }




})




//PUT /api/video/:videoid - Update a specific video
router.put("/:videoid", isAuthenticated, async (req, res, next) => {

    // console.log(req.params.videoid)

    try {

        let updatedVideo = await Video.findById(
            req.params.videoid);


        // console.log(updatedVideo.counts)

        updatedVideo = await Video.findByIdAndUpdate(
            req.params.videoid,
            {
                counts: updatedVideo.counts + 1,
                watched: req.body.watched,
            },
            { new: true }
        );

        // console.log(updatedVideo)

        res.json(updatedVideo);
    } catch (error) {
        next(error);
    }
});

//POST /api/video/new/- Create a new video and add it to a specific playlist
router.post("/new/", isAuthenticated, async (req, res, next) => {
    // console.log(req.body)

    try {
        const newVideo = await Video.create({
            link: req.body.link,
        });
        const addToPlaylist = await Playlist.findByIdAndUpdate(
            req.body.playlistId,
            {
                $push: { video: newVideo._id },
            }
        );
        // console.log("addToPlaylist: ", addToPlaylist)

        // console.log("only newVideo._id: ", newVideo._id)
        res.json(addToPlaylist);
    } catch (error) {
        console.log(error);
        next(error);
    }
});



//GET /api/video/top/:childid- get 20 most seen videos no in this child
router.get("/top20/:childid", isAuthenticated, async (req, res, next) => {
    // console.log(req.body)

    console.log("TTTTTTTTTTTTTTTTTOOOOOOOOOOOOOPPPPPPPPPPP")


    try {

        const allChildsPlaylist = await Playlist.find({
            child: req.params.childid,
        }).populate("video");

        const onlyAllChildsVideos = [];

        allChildsPlaylist.forEach((eachPlaylist) => {
            onlyAllChildsVideos.push(...eachPlaylist.video);
        });



        const onlyAllChildsLinks = [];

        onlyAllChildsVideos.forEach((eachPlaylist) => {
            onlyAllChildsLinks.push(eachPlaylist.link);

            // console.log(eachPlaylist.link)

        });



        // console.log(onlyAllChildsLinks)

        mostWatchedVideos = await Video.find().sort({ counts: -1 })
        // console.log(mostWatchedVideos.length)
        // console.log(mostWatchedVideos)

        onlyVideosChildDoesntHave = mostWatchedVideos.filter((eachMostWatchedVideo) => {

            if (!onlyAllChildsLinks.includes(eachMostWatchedVideo.link)) {


                console.log(eachMostWatchedVideo.link)

                return true
            }


        })

        // console.log(onlyVideosChildDoesntHave.length)
        res.json(onlyVideosChildDoesntHave);
    } catch (error) {
        console.log(error);
        next(error);
    }
});








module.exports = router;
