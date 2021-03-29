const User = require('../models/user');
const bcript = require('bcryptjs');
const { response, request } = require('express');
const { Task } = require('../models/task');
const { Note } = require('../models/note');


const salt = bcript.genSaltSync();

const updateUser = async (req = request, res = response) => {

    const { id, password, email, _id, active, ...user } = req.body;

    if (password) {
        user.password = bcript.hashSync(password, salt);
    }


    await User.findByIdAndUpdate(id, user);

    return res.json({
        message: 'User saved successfully'
    });



}

const deleteUser = async (req = request, res = response, next) => {

    
    const { id } = req.params;


    session = await User.startSession();

    try{
        await session.withTransaction(async () => {
            await User.findByIdAndUpdate(id, {
                active : false
            });
    
            await Task.updateMany({userId : id}, {active : false});
    
            await Note.updateMany({userId : id}, {active : false});
    
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
    createUser,
    updateUser,
    deleteUser
}