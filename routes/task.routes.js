const { check } = require('express-validator');
const { create } = require('../controllers/task.controller');
const { checkErrors } = require('../middlewares/check-errors');
//Router is a object, I have to create a new instance of it
const router = require('express').Router();

router.post('/create', [
    check('userId', 'That id is not valid').isMongoId(),
    check('description', 'Description can not be empty or null').notEmpty(),
    checkErrors
], create);

router.put('/update');

router.delete('/delete');

router.post('/read');



module.exports = router;




