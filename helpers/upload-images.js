const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');


const uploadImage = (file) => {

    return new Promise((resolve, reject) => {

        uploader(file.buffer)
            .then((result) => resolve(result.url))
            .catch((err) => reject(err.toString()));

    });

}

const uploader = (buffer) => {

    return new Promise((resolve, reject) => {
        
        const imageConsumer = cloudinary.uploader.upload_stream({
            folder : 'test',
            format : 'jpg',
        }, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    
        Readable.from(buffer).pipe(imageConsumer);
    
    });

}

module.exports = {
    uploadImage
}