import jwt from 'jsonwebtoken'
import User from '../module/User.js'

export const protect = async(req , res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(401).json({message : "No token provided"})

    console.log("token", token)
    // console.log("re.headers.authorization", req.headers.authorization)

    try {         
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decode", decode)
        next()  

    } catch (err) {
        res.status(401).json({message : "Invalid or expired token"})
        console.log(err)
    }
}