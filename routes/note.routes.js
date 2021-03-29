const Router = require('express');
const { check } = require('express-validator');
const { checkErrors } = require('../middlewares/check-errors');
const { userExists, noteExists } = require('../database/validators');
const { readNote, createNote, deleteNote } = require('../controllers/note.controller');
const router = Router();

//create note
router.post('', [
    check('title', 'title can not be empty').notEmpty(),
    check('body', 'body can not be empty').notEmpty(),
    check('userId', 'userId can not be empty or is no valid').isMongoId(),
    checkErrors,
], createNote);

router.get('/:userId', [
    check('userId', 'userId can not be empty or is not valid').isMongoId(),
    checkErrors,
], readNote);


router.delete('/:id', [
    check('id', 'id can not be empty or is not valid').isMongoId(),
    checkErrors,
    check('id', 'That note does not exists').custom(noteExists),
    checkErrors
], deleteNote);

router.put('', [
    check('id', 'id can not be empty or is no valid').isMongoId(),
    checkErrors,
    check('id', 'That note does not exists').custom(noteExists),
    checkErrors
],);



module.exports = router;