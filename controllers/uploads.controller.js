const { response, request } = require('express');
const { uploadImageCloudinary, deleteImageCloudinary } = require('../helpers/cloudinary-manager');
const { Note } = require('../models/note');
const { v4: uuid } = require('uuid');
const { ErrorHandler } = require('../errors/error-handler');


const uploadImage = async (req = request, res = response, next) => {

    const { noteId } = req.params;

    const note = await Note.findById(noteId);

    if(!note){
        return res.status(400).json({
            message : 'That note does not exists'
        });
    }

    try {

        const imagesUrls = await Promise.all(
            req.files.map((file) => {
                return uploadImageCloudinary(file, `${noteId}_${uuid()}`);
            })
        );

        note.files = [...note.files, ...imagesUrls];

        await note.save();

        return res.json({
            message: 'Image uploaded successfully'
        });


    } catch (error) {
        next(new ErrorHandler(500, 'An error has ocurred'));
    }

}

const deleteImage = async (req = request, res = response, next) => {

    const { image } = req.params;

    const [ noteId, imageId ] = image.split('_');

    const note = await Note.findById(noteId);

    if(!note){
        return res.status(404).json({
            message : 'That note does not exists'
        });
    }

    note.files = note.files.filter((file) => !file.includes(imageId));

    await note.save();

    res.json({
        message : 'image deleted successfully'
    });

    deleteImageCloudinary(image);


}





module.exports = {
    uploadImage,
    deleteImage
}