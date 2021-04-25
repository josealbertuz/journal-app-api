const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');


const uploadImageCloudinary = (file, fileName, folder = 'test') => {

    return new Promise((resolve, reject) => {

        uploader(file.buffer, fileName, folder)
            .then((result) => resolve(result.url))
            .catch((err) => reject(err.toString()));

    });

}

const uploader = (buffer, public_id, folder) => {

    return new Promise((resolve, reject) => {

        
        const imageConsumer = cloudinary.uploader.upload_stream({
            folder,
            public_id
        }, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    
        Readable.from(buffer).pipe(imageConsumer);
    
    });

}

module.exports = {
    uploadImage: uploadImageCloudinary
}