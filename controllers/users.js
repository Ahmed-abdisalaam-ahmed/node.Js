
const User = require('../module/User')

exports.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

exports.getUserInfo = (req , res) => {
    const user = users.find(u => u.id == req.params.id)

    if(!user) return res.status(404).send("User not Found")

    res.json(user)
}

exports.createUser = async (req, res) => {

    console.log("body.Req", req.body);

    const user = new User(req.body);

    const saved = await user.save();

    res.status(201).json(saved)
}

exports.updateUser = async (req, res) => {
   const {id} = req.params
}