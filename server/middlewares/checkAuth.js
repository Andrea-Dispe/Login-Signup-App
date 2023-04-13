const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const { JWT_SECRET } = process.env

const checkAuth = async (req, res, next) => {

   const token = req.header('x-access-token')
    // CHECK IF WE HAVE A TOKEN
    if (!token) {
        res.status(401).json({
            errors: [
                {
                    msg: "No token found"
                }
            ]
        })
    } else {
        try {
            const user = await jwt.verify(token, JWT_SECRET)
            req.email = user.email
            next()
        } catch (error) {
            res.status(400).json({
                errors: [
                    {
                        msg: 'Invalid Token'
                    }
                ]
            })
        }
    }
}

module.exports = checkAuth;