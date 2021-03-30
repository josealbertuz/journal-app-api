const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const googleVerify = async (idToken) => {

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const {email, name : username} = ticket.getPayload();

    return {
        email,
        username
    }

}

module.exports = {
    googleVerify
}