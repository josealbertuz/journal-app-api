const { response, request } = require('express');
const { Task } = require('../models/task');


const createTask = async (req = request, res = response) => {

    const { description, userId } = req.body;
    const task = new Task({ description, userId });

    await task.save();

    return res.status(201).json({
        message: 'Task saved successfully'
    });
}

const updateTask = async (req = request, res = response) => {

    const { _id, id, userId, ...task} = req.body;

    await Task.findByIdAndUpdate(id, task);

    return res.status(200).json({
        message: 'Task updated successfully'
    });

}

const deleteTask = async (req = request, res = response) => {

    const { id } = req.params;

    await Task.findByIdAndUpdate(id, {
        active : false
    });

    return res.status(200).json({
        message: 'Task updated successfully'
    });



}

const readTask = async (req = request, res = response) => {

    const { userId } = req.params;
    console.log(userId);
    const { offset = 0, limit = 5 } = req.query;

    const [tasks , results] = await Promise.all([
        Task.find({
            userId,
            active : true
        }).skip(offset).limit(limit),
        Task.countDocuments({
            userId,
            active : true
        })
    ]);

    return res.status(200).json({
        results,
        tasks
    });

}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    readTask
}