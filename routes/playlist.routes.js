const router = require("express").Router();
const Playlist = require("../models/Playlist.model")

// GET /api/playlist/all/:childid - Get all playlist of a specific child
router.get("/all/:childid", async (req, res, next) => {
    try {
        const AllPlaylistsOfChild = await Playlist.find({ child: req.params.childid });
        res.json(AllPlaylistsOfChild);
    } catch (error) {
        next(error);
    }
})

//POST /api/playlist/new/:childid - Create a new playlist of a specific child
router.post("/new/:childid", async (req, res, next) => {
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
router.get("/:playlistid", async (req, res, next) => {
    try {
        const playlistInfo = await Playlist.findById(req.params.playlistid);
        res.json(playlistInfo);
    } catch (error) {
        next(error);
    }
})

//DELETE /api/playlist/:playlistid - Delete a specific playlist
router.delete("/:playlistid", async (req, res, next) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.playlistid);
        res.json(deletedPlaylist);
    } catch (error) {
        next(error);
    }
})

//PUT /api/playlist/:playlistid - Update a specific playlist
router.put("/:playlistid", async (req, res, next) => {

    //! CHECK THIS PART SO VIDEOS ARE STORED PROPERLY
    console.log(req.body)
    try {
        const newPlaylistInfo = await Playlist.findByIdAndUpdate(req.params.playlistid, req.body, { new: true });
        res.json(newPlaylistInfo);
    } catch (error) {
        next(error);
    }
})

module.exports = router