const { response, request } = require('express');
const { Task } = require('../models/task');


const createTask = async (req = request, res = response, next) => {

    const { description } = req.body;
    const { uid: userId } = req.user;
    const task = new Task({ description, userId });

    try {
        await task.save();

        return res.status(201).json({
            message: 'Task saved successfully'
        });
    } catch (error) {
        next(new ErrorHandler(500, 'An error ocurred'));
    }
}

const updateTask = async (req = request, res = response, next) => {

    const { task } = req.body;

    const { taskId } = req.params;

    try {
        await Task.findByIdAndUpdate(taskId, task);

        return res.status(200).json({
            message: 'Task updated successfully'
        });
    } catch (error) {
        next(new ErrorHandler(500, 'An error ocurred'));
    }

}

const deleteTask = async (req = request, res = response, next) => {

    const { taskId } = req.params;

    try {
        await Task.findByIdAndUpdate(taskId, {
            active: false
        });
    
        return res.status(200).json({
            message: 'Task updated successfully'
        });
    } catch (error) {
        next(new ErrorHandler(500, 'An error ocurred'));
    }

}

const readTask = async (req = request, res = response, next) => {

    const { uid: userId } = req.user;

    try {
        const tasks = await Task.find({
            userId,
            active: true
        });
    
        return res.status(200).json({
            tasks
        });
    } catch (error) {
        next(new ErrorHandler(500, 'An error ocurred'));
    }

}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    readTask
}