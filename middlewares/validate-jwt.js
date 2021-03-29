const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { request, response } = require('../routes/auth.routes');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            message : 'No authorization token'
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.PRIVATE_KEY);

        const user = await User.findOne({
            _id : uid,
            active : true
        });

        if(!user){
            return res.status(401).json({
                message: 'Unauthorized user'
            });
        }

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized user'
        });
    }

}

module.exports = {
    validateJWT
}