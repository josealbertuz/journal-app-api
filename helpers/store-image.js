const multer = require('multer');
const uuid = require('uuid').v4;


const storage = (directory = 'uploads/') => {
    return multer.diskStorage({
        destination : function(req, file, cb){
            cb(null, directory);
        },
        filename : function(req, file, cb){
    
            const filenameToArray = file.originalname.split('.');
            const extension = filenameToArray[filenameToArray.length - 1];
    
            cb(null, `${uuid()}.${extension}`);
        }
    })
}

module.exports = storage;