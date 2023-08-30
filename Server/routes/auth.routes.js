const router = require("express").Router();
const Parent = require("../models/Parent.model")

//POST /api/auth/signin - Registration
router.post("/signin", async (req, res, next) => {
    const { name, email, password, yearOfBirth, childName } = req.body;

    // console.log(req.body)
    if (!name || !email || !password || !yearOfBirth || !childName) {
        res.status(400).json({ errorMessage: "All fields are required" })
        return;
    }

    try {
        isEmailDuplicated = await Parent.findOne({ email })
        // console.log(isEmailDuplicated)
        // res.json(isEmailDuplicated)
        if (isEmailDuplicated) {
            res.status(400).json({ errorMessage: "Email already registered" })
            return;
        } else {
            res.json("User can be created")
        }



    } catch (error) {
        next(error)
        console.log(error)
    }


})


//POST /api/auth/login - Authentication



//GET /api/auth/verify - Validation Authorization

module.exports = router;