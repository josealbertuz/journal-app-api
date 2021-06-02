const { Router } = require('express');
const { check, buildCheckFunction } = require('express-validator');
const router = Router();
const multer = require('multer');
const { uploadImage, deleteImage } = require('../controllers/uploads.controller');
const { fileFilter } = require('../helpers/validators');
const { checkErrors } = require('../middlewares/check-errors');
const multerUploader = multer({
    fileFilter : fileFilter()
});


/*
A multipart/form-data is not parsed, due to that I have to call first multer,
this middleware will parse the body and therefore check the fields
*/

router.post('/:noteId', [
    multerUploader.any(),
    check('noteId', 'noteId param is required and must be a valid id').isMongoId(),
    checkErrors
], uploadImage);

router.delete('/:image', deleteImage);


module.exports = router;