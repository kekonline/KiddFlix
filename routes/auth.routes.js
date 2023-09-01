const router = require("express").Router();
const Parent = require("../models/Parent.model");
const Child = require("../models/Child.model");

const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//POST /api/auth/signin - Registration
router.post("/signin", async (req, res, next) => {
    const { name, email, password, yearOfBirth, childName } = req.body;

    if (!name || !email || !password || !yearOfBirth || !childName) {
        res.status(400).json({ errorMessage: "All fields are required" });
        console.log(req.body);
        return;
    }
    try {
        isEmailDuplicated = await Parent.findOne({ email });
        // console.log(isEmailDuplicated)
        // res.json(isEmailDuplicated)
        if (isEmailDuplicated) {
            res
                .status(400)
                .json({ errorMessage: "Email already registered", emailValid: false });
            return;
        }

        if (yearOfBirth.length !== 4 || isNaN(yearOfBirth)) {
            res.status(400).json({ errorMessage: "Year of birth is not valid" });
            return;
        }

        const newParent = await Parent.create({
            name,
            email,
            password,
            yearOfBirth,
            childName,
        });
        // res.json(newParent)
        await Child.create({
            name: childName,
            parent: newParent._id,
        });
        const newChild = await Child.find({ parent: newParent._id }).select({
            name: 1,
        });
        // console.log(newChild)

        const payload = {
            _id: newParent._id,
        };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "365d",
        });

        res.json({ authToken });
    } catch (error) {
        next(error);
        console.log(error);
    }
});

//POST /api/auth/login - Authentication
router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const logingInParent = await Parent.findOne({ email });
        if (logingInParent === null) {
            res
                .status(400)
                .json({ errorMessage: "Email not registered", validLogin: false });
            return;
        }
        if (logingInParent.password !== password) {
            res
                .status(400)
                .json({ errorMessage: "Incorrect password", validLogin: false });
            return;
        }
        const logingInParentChilds = await Child.find({
            parent: logingInParent._id,
        }).select({ name: 1 });
        // res.json(logingInParentChilds)

        const payload = {
            _id: logingInParent._id,
        };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "365d",
        });
        res.json({ authToken });
    } catch (error) {
        next(error);
    }
});

//GET /api/auth/verify - Validation Authorization
router.get("/verify", isAuthenticated, (req, res, next) => {
    //send the payload to the client
    // console.log("token", req.payload)

    res.json(req.payload);
});


module.exports = router;
