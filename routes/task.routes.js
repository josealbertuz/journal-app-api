const { check } = require('express-validator');
const { deleteTask, updateTask, createTask, readTask } = require('../controllers/task.controller');
const { userExists, taskExists } = require('../helpers/validators');
const { checkErrors } = require('../middlewares/check-errors');
//Router is a object, I have to create a new instance of it
const router = require('express').Router();

router.post('', [
    check('description', 'description can not be empty').notEmpty(),
    checkErrors
], createTask);

router.put('/:taskId', [
    check('taskId', 'id can not be empty').notEmpty(),
    checkErrors,
    check('taskId', 'That id does not exists').custom(taskExists),
    checkErrors
], updateTask);

router.delete('/:taskId', [
    check('taskId', 'id can not be empty').notEmpty(),
    checkErrors,
    check('taskId', 'That id does not exists').custom(taskExists),
    checkErrors
], deleteTask);

router.get('', readTask);



module.exports = router;




