const router = require("express").Router();
const Child = require("../models/Child.model")

// GET /api/child/all - Get all children of a specific parent
router.get("/all/:parentId", async (req, res, next) => {
    // console.log(req.params.parentId)

    try {
        const AllChildsOfParent = await Child.find({ parent: req.params.parentId }).select({ name: 1 });
        res.json(AllChildsOfParent);
    } catch (error) {
        next(error);
    }
})

//POST /api/child/new - Create a new children of a specific parent
router.post("/new/:parentId", async (req, res, next) => {
    try {
        const newChild = await Child.create({
            name: req.body.name,
            parent: req.params.parentId,
            picture: req.body.picture
        });
        res.json(newChild);
    } catch (error) {
        next(error);
    }
})

// GET /api/child/:childid - Get information about a specific child
router.get("/:childId", async (req, res, next) => {
    try {
        const childInfo = await Child.findById(req.params.childId);
        res.json(childInfo);
    } catch (error) {
        next(error);
    }
})

//DELETE /api/child/:childid - Delete a specific child
router.delete("/:childId", async (req, res, next) => {
    try {
        const deletedChild = await Child.findByIdAndDelete(req.params.childId);
        res.json(deletedChild);
    } catch (error) {
        next(error);
    }
})

//PUT /api/child/:childid - Update a specific child
router.put("/:childId", async (req, res, next) => {
    try {
        const updatedChild = await Child.findByIdAndUpdate(req.params.childId, {
            name: req.body.name,
            picture: req.body.picture
        }, { new: true });
        res.json(updatedChild);
    } catch (error) {
        next(error);
    }
})


module.exports = router;