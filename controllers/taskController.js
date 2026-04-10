import Task from "../module/Task.js";

export const createTask = async(req, res, next) => {
    try {
            const task = await Task.create({...req.body, createdBy: req.user._id})
            res.status(201).json(task)
    } catch (err) {
            next(err)
    }
}

export const getMyTask = async (req, res, next) => {
        try {
                const tasks = await Task.find({createdBy: req.user._id})
                res.status(200).json(tasks)
        } catch (err) {
                next(err)
        }
}

export const UpdateTask = async(req, res, next) => {
        try {
                
                const task = await Task.findByIdAndUpdate(
                        { _id: req.params.id, createdBy: req.user._id },
                        req.body,
                        { new: true }
                );
                if(!task) return res.status(404).json({message: "Task not Found"})
                res.json(task)
        } catch (err) {
        next(err)
        }
}

export const deleteTask = async(req, res, next) => {
        try {
                
                const task = await Task.findByIdAndDelete(
                        { _id: req.params.id, createdBy: req.user._id })
                if(!task) return res.status(404).json({message: "Task not Found"})
                res.json({message: "Task deleted"})
        } catch (err) {
                next(err)
        }
}