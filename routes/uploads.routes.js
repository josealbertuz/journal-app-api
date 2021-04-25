const { Router } = require('express');
const router = Router();
const multer = require('multer');
const { uploadImage } = require('../controllers/uploads.controller');
const { fileFilter } = require('../helpers/validators');
const storage = require('../helpers/store-image');
const multerUploader = multer({
    fileFilter : fileFilter(),
    storage : storage(),
});


/*
A multipart/form-data is not parsed, due to that I have to call first multer,
this middleware will parse the body and therefore check the fields
*/

router.post('', [
    multerUploader.single('image')
], uploadImage);




module.exports = router;