const router = require("express").Router();
const Parent = require("../models/Parent.model");

// GET /api/parent/:parentid - Get information about a specific parent
router.get("/:parentid", async (req, res, next) => {
    try {
        const parentInfo = await Parent.findById(req.params.parentid);
        res.json(parentInfo);
    } catch (error) {
        next(error);
    }
})

//PUT /api/parent/:parentid - Update a specific parent
router.put("/:parentid", async (req, res, next) => {
    try {
        const newParentInfo = await Parent.findByIdAndUpdate(req.params.parentid, req.body, { new: true });
        res.json(newParentInfo);
    } catch (error) {
        next(error);
    }
})

module.exports = router;