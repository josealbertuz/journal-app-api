const User = require('../models/user');
const bcript = require('bcryptjs');
const { response, request } = require('express');
const { Task } = require('../models/task');
const { Note } = require('../models/note');


const salt = bcript.genSaltSync();

const updateUser = async (req = request, res = response) => {

    const {password, email, _id, active, ...user } = req.body;

    if (password) {
        user.password = bcript.hashSync(password, salt);
    }

    const {uid} = req.user;

    await User.findByIdAndUpdate(uid, user);

    return res.json({
        message: 'User updated successfully'
    });



}

const deleteUser = async (req = request, res = response, next) => {

    
    const { uid } = req.user;

    session = await User.startSession();

    try{
        await session.withTransaction(async () => {
            await User.findByIdAndUpdate(uid, {
                active : false
            });
    
            await Task.updateMany({'userId' : uid}, {active : false});
    
            await Note.updateMany({'userId' : uid}, {active : false});
    
        });

    }catch(err){
        console.log(err);
        next(new ErrorHandler(500, 'An error ocurred'));
    }finally{
        session.endSession();
    }


    return res.status(200).json({
        message: 'Operation successful'
    });

}



module.exports = {
    updateUser,
    deleteUser
}