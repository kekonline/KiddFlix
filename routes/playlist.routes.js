const router = require("express").Router();
const Playlist = require("../models/Playlist.model")
const isAuthenticated = require("../middlewares/isAuthenticated")
// GET /api/playlist/all/:childid - Get all playlist of a specific child
router.get("/all/:childid", isAuthenticated, async (req, res, next) => {

    console.log("child if", req.params.childid);


    try {



        const AllPlaylistsOfChild = await Playlist.find({ child: req.params.childid });
        res.json(AllPlaylistsOfChild);
        // console.log(AllPlaylistsOfChild);
    } catch (error) {
        next(error);
    }
})

//POST /api/playlist/new/:childid - Create a new playlist of a specific child
router.post("/new/:childid", isAuthenticated, async (req, res, next) => {
    try {
        const newPlaylist = await Playlist.create({
            name: req.body.name,
            child: req.params.childid
        });
        res.json(newPlaylist);
    } catch (error) {
        next(error);
    }
})

// GET /api/playlist/:playlistid - Get information about a specific playlist
router.get("/:playlistid", isAuthenticated, async (req, res, next) => {
    try {
        const playlistInfo = await Playlist.findById(req.params.playlistid);
        res.json(playlistInfo);
    } catch (error) {
        next(error);
    }
})

//DELETE /api/playlist/:playlistid - Delete a specific playlist
router.delete("/:playlistid", isAuthenticated, async (req, res, next) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.playlistid);
        res.json(deletedPlaylist);
    } catch (error) {
        next(error);
    }
})

//PUT /api/playlist/:playlistid - Update a specific playlist
router.put("/:playlistid", isAuthenticated, async (req, res, next) => {

    //! CHECK THIS PART SO VIDEOS ARE STORED PROPERLY
    // console.log(req.body)
    try {
        const newPlaylistInfo = await Playlist.findByIdAndUpdate(req.params.playlistid, req.body, { new: true });
        res.json(newPlaylistInfo);
    } catch (error) {
        next(error);
    }
})

// GET /api/playlist/videos/:playlistid - Get all videos of a specific playlist
router.get("/videos/:playlistId", isAuthenticated, async (req, res, next) => {



    try {
        const AllVideosOfPlaylist = await Playlist.findById(req.params.playlistId).populate("video");


        console.log("id of playlist: ", AllVideosOfPlaylist)
        res.json(AllVideosOfPlaylist);
    } catch (error) {
        next(error);
    }
})

//GET /api/playlist/oneVideo/:playlistid/- Get one video of a specific playlist

router.get("/oneVideo/:playlistId", isAuthenticated, async (req, res, next) => {
    try {
        const OneVideoFromPlaylist = await Playlist.findById(req.params.playlistId).populate("video");
        // console.log(OneVideoFromPlaylist.video[0].link)
        res.json(OneVideoFromPlaylist.video[0].link);
    } catch (error) {
        next(error);
    }
})


//PUT /api/playlist/name/:playlistid - Update a specific playlist name
router.put("/name/:playlistid", isAuthenticated, async (req, res, next) => {


    console.log(req.body.name)
    console.log(req.params.playlistid)


    try {
        const newPlaylistInfo = await Playlist.findByIdAndUpdate(req.params.playlistid, { name: req.body.name }, { new: true });

        console.log(newPlaylistInfo)

        res.json(newPlaylistInfo);
    } catch (error) {
        next(error);
    }
})

//GET /api/playlist/number/:playlistid - Update a specific playlist name
router.get("/playlist/number/:playlistid", isAuthenticated, async (req, res, next) => {

    try {





    } catch (error) {
        next(error);
    }





})



module.exports = router