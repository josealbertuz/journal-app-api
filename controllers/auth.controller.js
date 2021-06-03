const { response, request } = require('express');
const { ErrorHandler } = require('../errors/error-handler');
const bcript = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const salt = bcript.genSaltSync();

const login = async (req = request, res = response, next) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({
            email,
            active: true
        });

        if (user) {

            const validPassword = bcript.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(404).json({
                    message: 'Password not valid'
                });
            }

            const token = await generateJWT(user._id);

            res.cookie('token', token, { httpOnly: true });

            return res.status(200).json({
                ...user.toJSON()
            });

        }

        return res.status(404).json({
            message: 'This user does not exists'
        });

    } catch (error) {
        next(new ErrorHandler(500, 'An error ocurred'));
    }

}

const signup = async (req = request, res = response, next) => {

    const { email, username, password } = req.body;

    const user = new User({ email, username, password });

    user.password = bcript.hashSync(user.password, salt);

    try {
        const savedUser = await user.save();

        const token = await generateJWT(user._id);

        res.cookie('token', token, { httpOnly: true });

        return res.json({
            ...savedUser.toJSON()
        });
    } catch (error) {
        next(new ErrorHandler(500, 'An error ocurred'));
    }


}

const google = async (req = request, res = response, next) => {

    const { id_token } = req.body;

    try {
        const { email, username } = await googleVerify(id_token);

        let user = await User.findOne({
            email
        });


        if (!user) {

            user = new User({
                email,
                username,
                password: ':D'
            });

            await user.save();

        }

        if (!user.active) {
            return res.status(401).json({
                message: 'This user already exists, probably is inactive'
            });
        }

        const token = await generateJWT(user.id);

        res.cookie('token', token, { httpOnly: true });

        return res.status(200).json({
            ...user.toJSON()
        });

    } catch (err) {
        return res.status(401).json({
            message: 'Unauthorized user'
        });
    }
}

const getAuthorizedUser = async (req = request, res = response, next) => {

    const { uid } = req.user;

    if(!uid){
        return res.status(401).json({
            message: 'Unauthorized user'
        });
    }

    try {
        const user = await User.findOne({
            _id : uid,
            active : true
        });

        if(user){
            return res.status(200).json({
                ...user.toJSON()
            });
        }

        return res.status(401).json({
            message: 'Unauthorized user'
        });

    } catch (error) {
        next(new ErrorHandler(500, 'An error occurred'));
    }
}

const logout = (req = request, res = response, next) => {

    res.cookie('token', 'none', { httpOnly: true });

    return res.status(200).json({
        message : 'User logged out successfully'
    });

}

module.exports = {
    login,
    signup,
    google,
    getAuthorizedUser,
    logout
}