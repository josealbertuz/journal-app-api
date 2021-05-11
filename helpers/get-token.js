const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getToken = (req) => {

    const token = req.cookies?.token ?? null;

    if(!token){
        return null;
    }

    return token;
}


module.exports = getToken;