const Router = require('express');
const router = Router();
const multer = require('multer');
const { check } = require('express-validator');
const { checkErrors } = require('../middlewares/check-errors');
const { noteExists, checkMimeFile } = require('../helpers/validators');
const { readNote, createNote, deleteNote } = require('../controllers/note.controller');
const uploadFile = multer({
    fileFilter : checkMimeFile
});

/*
create note
============
A multipart/form-data is not parsed, owe to that I have to call first multer,
this middleware will parse the body and therefore check the fields
*/
router.post('', [
    uploadFile.array('images', 3),
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