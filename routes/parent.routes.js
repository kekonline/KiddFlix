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

module.exports = router;