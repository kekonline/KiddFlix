const router = require("express").Router();
const Parent = require("../models/Parent.model")
const Child = require("../models/Child.model")

const jwt = require("jsonwebtoken");

// // Creating new session function
// router.post("/new-session", async (req, res, next) => {
//     // console.log("newSession process")
//     try {
//         const payload = {
//             name: parent.name,
//             _id: parent._id,
//             childs: childList,
//         }
//         const authToken = jwt.sign(
//             payload,
//             process.env.TOKEN_SECRET,
//             { algorithm: "HS256", expiresIn: "365d" }
//         )
//         res.json({ authToken })
//     } catch (error) {
//         next(error)
//     }
// })

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
        }
        const newParent = await Parent.create({
            name,
            email,
            password,
            yearOfBirth,
            childName
        })
        // res.json(newParent)
        res.json(newParent._id)
        await Child.create({
            name: childName,
            parent: newParent._id
        })
        const newChild = await Child.find({ parent: newParent._id }).select({ name: 1 })
        // console.log(newChild)

        const payload = {
            name: newParent.name,
            _id: newParent._id,
            childs: newChild,
        }
        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { algorithm: "HS256", expiresIn: "365d" }
        )

        res.json({ authToken })
    } catch (error) {
        next(error)
        console.log(error)
    }
})


//POST /api/auth/login - Authentication
router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const logingInParent = await Parent.findOne({ email })
        if (logingInParent === null) {
            res.status(400).json({ errorMessage: "Email not registered" })
            return
        }
        if (logingInParent.password !== password) {
            res.status(400).json({ errorMessage: "Incorrect password" })
            return
        }
        const logingInParentChilds = await Child.find({ parent: logingInParent._id }).select({ name: 1 })
        // res.json(logingInParentChilds)

        const payload = {
            name: logingInParent.name,
            _id: logingInParent._id,
            childs: logingInParentChilds,
        }
        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { algorithm: "HS256", expiresIn: "365d" }
        )
        res.json({ authToken })

    } catch (error) {
        next(error)
    }
})

//GET /api/auth/verify - Validation Authorization




module.exports = router;