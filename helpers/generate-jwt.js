const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {

        jwt.sign({ uid }, process.env.PRIVATE_KEY, {
            expiresIn : '2d',
            algorithm : 'HS256'
        }, (err, token) => {

            if(err){
                reject(err);
            }

            resolve(token);
        });
    });
}

module.exports = {
    generateJWT
}