const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({

    //token initialization settings
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    // returns payload
    requestProperty: "payload",
    getToken: (req) => {
        //   console.log(req.headers)
        // checks  we have recived a token
        if (req.headers === undefined || req.headers.authorization === undefined) {
            ("No token")
            return null
        }
        //splitting token string
        const tokenArr = req.headers.authorization.split(" ")
        // const [ tokenType, token ] = tokenArr
        const tokenType = tokenArr[0]
        const token = tokenArr[1]

        if (tokenType !== "Bearer") {
            // console.log("Token type not valid")
            return null
        }
        //   console.log("Returning token")
        return token

    }
})

module.exports = isAuthenticated