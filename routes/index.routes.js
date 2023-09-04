const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// login, signin, verify
const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

// parent routes
const parentRouter = require("./parent.routes")
router.use("/parent", parentRouter)

// child routes
const childRouter = require("./child.routes")
router.use("/child", childRouter)

// playlist routes
const playlistRouter = require("./playlist.routes")
router.use("/playlist", playlistRouter)

// video routes
const videoRouter = require("./video.routes")
router.use("/video", videoRouter)

//  cloudinary routes
const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);




module.exports = router;
