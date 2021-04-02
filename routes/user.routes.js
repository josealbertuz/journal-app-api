const { Router } = require('express');
const { check } = require('express-validator');
const {createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { emailExists, userExists } = require('../helpers/validators');
const { checkErrors } = require('../middlewares/check-errors');

const router = Router();

//Middlwares in routes follows the same structure as the callback function (req, res, next){}

/*
router.post('/read', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password, min length 8').notEmpty(),
    checkErrors
], readUser);
*/

/*
router.post('', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password, min length 8').isLength({
        min: 8
    }),
    check('username', 'Required username').notEmpty(),
    check('email', 'Invalid email').custom(emailExists),
    checkErrors
], createUser);
*/

router.put('', updateUser);

router.delete('',  deleteUser);

module.exports = router;