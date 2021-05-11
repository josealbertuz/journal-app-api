const { response, request } = require('express');
const { ErrorHandler } = require('../errors/error-handler');
const bcript = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const jwt = require('jsonwebtoken');

const salt = bcript.genSaltSync();

const login = async (req = request, res = response, next) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({
            email,
            active : true
        });
  
        if(user){

            const validPassword = bcript.compareSync(password, user.password);

            if(!validPassword){
                return res.status(404).json({
                    message : 'Password not valid'
                });
            }

            const token = await generateJWT(user._id);

            res.cookie('token', token, {
                httpOnly : true
            });

            return res.status(200).json({
                ...user.toJSON()
            });
              
        }

        return res.status(404).json({
            message : 'This user does not exists'
        });

    } catch (error) {
        console.log(error);
        next(new ErrorHandler(500, 'An error ocurred'));
    }

}

const signup = async (req = request, res = response, next) => {

    const { email, username, password } = req.body;

    const user = new User({ email, username, password });

    user.password = bcript.hashSync(user.password, salt);

    const savedUser = await user.save();

    const token = await generateJWT(user._id);

    req.cookie('token', token, {
        httpOnly : true
    });

    return res.json({
        ...savedUser.toJSON(),
    });


}

const google = async (req = request, res = response, next) => {

    const { id_token } = req.body;

    try{
        const { email, username } = await googleVerify(id_token);

        let user = await User.findOne({
            email
        });

    
        if (!user){

            user = new User({
                email,
                username,
                password : ':D'
            });

            await user.save();

        }

        if(!user.active){
            return res.status(401).json({
                message : 'This user already exists, probably is inactive'
            });
        }

        const token = await generateJWT(user.id);

        res.cookie('token', token, {
            httpOnly : true
        });

        return res.status(200).json({
            ...user
        });

    }catch(err){
        return res.status(401).json({
            message : 'Unauthorized user'
        })
    }
}

const getUserByToken = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    try {
        
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);

        const user = await User.findById(uid);

        if(!user){
            return res.status(404).json({
                message : 'That user does no exist'
            });
        }

        return res.json({
            user,
            token
        });


    } catch (error) {
        next(new ErrorHandler(401, 'Unauthorized user'));
    }




}


module.exports = {
    login,
    signup,
    google,
    getUserByToken
}