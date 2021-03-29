const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {

        jwt.sign({ uid }, process.env.PRIVATE_KEY, (err, token) => {

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