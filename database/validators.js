const User = require("../models/user");

const emailExists = async (email) => {
    const document = await User.userExists(email);

    if(document) throw new Error('This email already exists');

}

module.exports = {
    emailExists
}