const Router = require('express');
const {check} = require('express-validator');
const { login, signup, google } = require('../controllers/auth.controller');
const { emailExists } = require('../helpers/validators');
const { checkErrors } = require('../middlewares/check-errors');
const router = Router();

router.post('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').notEmpty(),
    checkErrors
], login);

router.post('/signup', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password, min length 8').isLength({
        min: 8
    }),
    check('username', 'Required username').notEmpty(),
    check('email', 'Invalid email').custom(emailExists),
    checkErrors
], signup);

router.post('/google', [
    check('token_id', 'token_id can not be empty').notEmpty(),
    checkErrors
], google);



module.exports = router;