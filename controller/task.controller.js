const taskModel = require("../model/task.model");

// POST - Create Task
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = await taskModel.create({
            title, description, status, user: req.userId
        });

        res.status(201).json(task);

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// GET ALL TASKS
const getUserTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({
            user: req.userId,   
        }).sort({ createdAt: -1 });

        res.status(200).json({
           tasks: tasks,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// UPDATE TASK
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find task belongs to logged user
        const task = await taskModel.findOne({
            _id: id,
            user: req.userId,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found or unauthorized",
            });
        }

        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Task updated successfully",
            updatedTask,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Check ownership
        const task = await taskModel.findOne({
            _id: id,
            user: req.userId,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found or unauthorized",
            });
        }

        await taskModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createTask, getUserTasks, updateTask, deleteTask };