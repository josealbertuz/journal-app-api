const Router = require('express');
const router = Router();
const { check } = require('express-validator');
const { checkErrors } = require('../middlewares/check-errors');
const { readAllNotes, createNote, deleteNote, readNoteById } = require('../controllers/note.controller');

router.post('', createNote);

router.get('', readAllNotes);

router.get('/:id', [
    check('id', 'id can not be empty or is not valid').isMongoId(),
    checkErrors
], readNoteById);

router.delete('/:id', [
    check('id', 'id can not be empty or is not valid').isMongoId(),
    checkErrors
], deleteNote);

router.put('/:id', [
    check('id', 'id can not be empty or is no valid').isMongoId(),
    checkErrors,
],);



module.exports = router;