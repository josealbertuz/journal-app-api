const { response, request } = require('express');
const { ErrorHandler } = require('../errors/error');
const bycript = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req = request, res = response, next) => {

    const { email, password } = req.body;

    try {

        const user = await User.login(email);
  
        if(user){

            const validPassword = bycript.compareSync(password, user.password);

            if(!validPassword){
                return res.status(404).json({
                    message : 'Password not valid'
                });
            }

            const token = await generateJWT(user._id);

            delete user.password;

            return res.status(200).json({
                user,
                token
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

    await user.save();

    return res.json({
        message: 'User saved successfully'
    });


}


module.exports = {
    login,
    signup
}