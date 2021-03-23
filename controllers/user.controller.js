const User = require('../models/user');
const bcript = require('bcryptjs');
const { response, request } = require('express');


const salt = bcript.genSaltSync();


const readUser = async (req, res) => {

    const { email, password } = req.body;

    const document = await User.userExists(email);

    if (bcript.compareSync(password, document.password)) {
        return res.json(document);
    } else {
        return res.status(404).json({
            message: 'That user doesn\'t exist'
        });
    }

}

const createUser = async (req, res = response) => {

    const { email, username, password } = req.body;

    const user = User({ email, username, password });

    user.password = bcript.hashSync(user.password, salt);

    await user.save();

    return res.json({
        message: 'User saved successfully'
    });

}

const updateUser = async (req = request, res = response) => {

    const {id, password, email, _id, ...user} = req.body;

    if(password){
      user.password = bcript.hashSync(password, salt);
    }

    console.log(user);

    try {
        await User.findByIdAndUpdate(id, user);

        return res.json({
            message: 'User saved successfully'
        });
        
    } catch (error) {

        console.log(err);

        return res.status(404).json({
            message: 'User doesn\'t exist'
        });

    }



}

const deleteUser = async (req = request, res = response) => {

    const { id } = req.body;

    try{
        await User.findByIdAndUpdate(id, {active : false});
        return res.status(200).json({
            message: 'Operation successful'
        })

    }catch(err){
        return res.status(404).json({
            message: 'User doesn\'t exist'
        });

    }
        
}



module.exports = {
    readUser,
    createUser,
    updateUser,
    deleteUser
}