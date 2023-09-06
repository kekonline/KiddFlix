const router = require("express").Router();
const Parent = require("../models/Parent.model");

const isAuthenticated = require("../middlewares/isAuthenticated")

// GET /api/parent/ - Get information about a specific parent
router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        const parentInfo = await Parent.findById(req.payload._id);
        res.json(parentInfo);
    } catch (error) {
        next(error);
    }
})

//PUT /api/parent/:parentid - Update a specific parent
router.put("/", isAuthenticated, async (req, res, next) => {
    try {
        const newParentInfo = await Parent.findByIdAndUpdate(req.payload._id, req.body, { new: true });
        res.json(newParentInfo);
    } catch (error) {
        next(error);
    }
})

// GET /api/parent/YOBCheck- check if the parent's year of birth is correct
router.post("/YOBCheck", isAuthenticated, async (req, res, next) => {

    try {
        const parentInfo = await Parent.findById(req.payload._id).select({ yearOfBirth: 1 });
        // console.log(parentInfo.yearOfBirth)
        // console.log(req.body.yearOfBirth)
        if (parentInfo.yearOfBirth === parseInt(req.body.yearOfBirth)) {
            res.json(true)
        } else {
            res.json(false)
        }
    } catch (error) {
        next(error);
    }
})


module.exports = router;