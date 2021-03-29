const Router = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { emailExists } = require('../database/validators');
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
], )



module.exports = router;