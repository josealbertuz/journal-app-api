const Router = require('express');
const router = Router();
const { check } = require('express-validator');
const { checkErrors } = require('../middlewares/check-errors');
const { noteExists } = require('../helpers/validators');
const { readNote, createNote, deleteNote } = require('../controllers/note.controller');

router.post('', [
    check('title', 'title can not be empty').notEmpty(),
    check('body', 'body can not be empty').notEmpty(),
    checkErrors
], createNote);

router.get('', readNote);

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