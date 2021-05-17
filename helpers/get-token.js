const getToken = (req) => {

    const token = req.header('x-token');

    if(!token){
        return null;
    }

    return token;
}


module.exports = getToken;