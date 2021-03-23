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
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

/*
TaskSchema.method('insert', async function () {

    try {

        const session = await Task.startSession();
    
        session.withTransaction(async () => {
    
            await this.save();
            const doc = await User.findById('605a3a682f66f228042b4a60');

            console.log(doc);

            return res.status(201).json({
                message: 'Task save successfully'
            });
    
        })
        session.endSession();
        
    } catch (error) {
        throw error;
    }
});
*/

const Task = model('Task', TaskSchema);

module.exports = {
    Task,
    TaskSchema
}