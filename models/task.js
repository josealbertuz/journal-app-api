const { Schema, model } = require('mongoose');
const User = require('./user');

const TaskSchema = new Schema({
    description: {
        type: String,
        require: true
    },
    completed: {
        type: Date,
        default: null
    },
    priority: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        require: true
    },
    active : {
        type: Boolean,
        default: true
    }
});

TaskSchema.methods.toJSON = function() {

    const {_id, active, userId, __v, created_at, updated_at, ...task} = this.toObject();

    return task;


}

const Task = model('Task', TaskSchema);

module.exports = {
    Task,
    TaskSchema
}