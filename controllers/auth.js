import User from "../module/User.js";
import { generateToken } from "../utils/generateToken.js";

// Register new user 
export const register = async (req, res, next) => {

    let {name, email, password, role} = req.body;

    try {
        // checking  if user exist
        email = email.toLowerCase();
        const exists = await User.findOne({ email })

        if(exists) return res.status(400).json({ message : 'Email already in user'})
        // if not exist then create a user
        const user = await User.create({name, password, email,role})

        const token = generateToken(user.id)

        res.status(201).json({token})

    } catch (err) {
        console.log(err)
        next(err)
    }
}

// login a user
export const login = async (req, res, next) => {
    let {email, password} = req.body;
    try {
        email = email.toLowerCase()
        const user = await User.findOne({ email })
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message : "Invalid email or Password"})
        }
        console.log("user info", user)
        const token = generateToken(user._id)
        res.status(200).json({token})   

    } catch (err) {
        console.log( "error for a login in",err)
        next(err)
    }
}