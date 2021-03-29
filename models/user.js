const {Schema, model} = require('mongoose');

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
    }
});

UserSchema.methods.toJSON = function() {
    const {active, password, __v, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

UserSchema.static('login', async function(email) {
    
    const [user] = await this.aggregate()
        .match({
            email,
            active : true
        }).project({
            active : 0,
            __v : 0,
        }).lookup({
            from : 'tasks',
            as : 'tasks',
            let : {strId : {$toString : '$_id'}},
            pipeline : [
                {$match : {
                    $expr : {
                        $eq : ['$userId', '$$strId']
                    }
                }},
                {$project : {
                    active : 0,
                    userId : 0,
                    __v : 0
                }},
                {$limit : 5}
            ],
        }).limit(1);

        return user;
});


const User = model('User', UserSchema);


module.exports = User;
