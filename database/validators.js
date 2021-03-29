const { Note } = require("../models/note");
const { Task } = require("../models/task");
const User = require("../models/user");

const emailExists = async (email) => {
    const document = await User.findOne({
        email,
    });

    if (document) throw new Error('This email already exists');

}

const userExists = async (id) => {

    const document = await User.findById(id);

    if (!document) throw new Error('That user does not exists');

}

const taskExists = async (_id) => {
    const document = await Task.findOne({
        _id,
        active : true
    });

    if (!document) throw new Error('That task does not exists');
}

const noteExists = async (_id) => {

    const document = await Note.findOne({
        _id,
        active : true
    });

    if (!document) throw new Error('That note does not exists');

}

module.exports = {
    emailExists,
    userExists,
    taskExists,
    noteExists
}