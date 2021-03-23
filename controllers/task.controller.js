const { response, request, json } = require('express');
const { Task } = require('../models/task');
const User = require('../models/user');


const create = async (req = request, res = response) => {

    const { description, userId } = req.body;
    const task = new Task({ description, userId });

    await User.findById(userId, async (err, doc) => {

        if (!doc) {

            return res.status(404).json({
                message: 'That user does not exist'
            });

        } else if (err) {

            return res.status(500).json({
                message: 'An error ocurred on the server'
            });

        } else {
            
            const user = new User(doc);

            user.tasks.push(task);

            await user.save();
            await task.save();

            return res.status(201).json({
                message: 'Task save successfully'
            });


        }

    });


}

module.exports = {
    create
}