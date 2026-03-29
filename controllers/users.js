import User from '../module/User.js'
import { generateToken } from '../utils/generateToken.js'

export const getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

export const getUserInfo = async (req , res) => {

    try {
     const user =await User.findById(req.params.id);

    if(!user) return res.status(404).send("User not Found")

      res.json(user)
    } catch (error) {
        res.status(500).send("server is down")
    }

}

export const createUser = async (req, res) => {

    console.log("body info", req.body)

    const user = new user(req.body)

    const saved = await user.save()
    
    res.status(201).json(saved)
}

export const updateUser = async (req, res) => {
    const {id} = req.params;

    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new : true})

        if(!updatedUser) {
            return res.status(404).send("User Not Found!")
        }
        res.status(201).json(updatedUser);
    } catch (err) {
            res.status(500).send('Server error')
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return res.status(404).send('User not Found')
        }
        res.status(201).json(deletedUser)


    } catch (error) {
        res.status(501).json({message: error.message})
    }
}