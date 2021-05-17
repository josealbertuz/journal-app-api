const { response, request } = require('express');
const { Task } = require('../models/task');


const createTask = async (req = request, res = response) => {

    const { description } = req.body;
    const {uid : userId} = req.user;
    const task = new Task({description, userId});

    await task.save();

    return res.status(201).json({
        message: 'Task saved successfully'
    });
}

const updateTask = async (req = request, res = response) => {

    const { task } = req.body;

    const { taskId } = req.params;
    
    await Task.findByIdAndUpdate(taskId, task);

    return res.status(200).json({
        message: 'Task updated successfully'
    });

}

const deleteTask = async (req = request, res = response) => {

    const { taskId } = req.params;

    await Task.findByIdAndUpdate(taskId, {
        active : false
    });

    return res.status(200).json({
        message: 'Task updated successfully'
    });

}

const readTask = async (req = request, res = response) => {

    const { uid :userId } = req.user;


    const tasks = await Task.find({
        userId,
        active : true
    });

    

    return res.status(200).json({
        tasks
    });

}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    readTask
}