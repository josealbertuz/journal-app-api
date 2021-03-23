const {Schema, model} = require('mongoose');
const { NoteSchema } = require('./note');
const { TaskSchema } = require('./task');

const UserSchema = new Schema({
    email : {
        type : String,
        require : true,
        unique: true
    },
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    active : {
        type : Boolean,
        default : true
    },
    tasks : {
        type : [TaskSchema],
        default : []
    },
    notes : {
        type : [NoteSchema],
        default : []
    }
},{
    versionKey : false
});

UserSchema.methods.toJSON = function() {
    const {active, password, __v, ...user} = this.toObject();
    return user;
}

UserSchema.static('userExists', async function(email){

    return await this.findOne({
        email,
    });

});

/*
UserSchema.static('addTask', function(task) {

    return new Promise((resolve, reject) => {

        this.updateOne({_id : task.userId} , {
            $push : {
                tasks : {
                    $each : [task],
                    $slice : -5
                }
            }
        }, (err, res) => {
            err ? reject(err) : resolve(res);
        });

    });

});
*/

const User = model('User', UserSchema);


module.exports = User;
