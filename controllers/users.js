
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

    console.log("body info", req.body)

    const user = new user(req.body)

    const saved = await user.save()
    
    res.status(201).json(saved)
}

exports.updateUser = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
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