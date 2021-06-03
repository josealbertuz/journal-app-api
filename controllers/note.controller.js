const { response, request } = require('express');
const { Note } = require('../models/note');


const createNote = async (req = request, res = response, next) => {

    const { uid: userId } = req.user;

    const note = new Note({ userId });

    try {

        const { _id: noteId } = await note.save();

        return res.status(201).json({
            noteId
        });

    } catch (error) {
        next(new ErrorHandler(500, 'An error ocurred'));
    }

}

const readAllNotes = async (req = request, res = response, next) => {

    const { uid: userId } = req.user;

    try{
        const notes = await Note.find({
            userId,
            active: true
        });
    
        return res.status(200).json({
            notes
        });
    }catch(error){
        next(new ErrorHandler(500, 'An error ocurred'));
    }
}

const readNoteById = async (req = request, res = response, next) => {

    const { uid: userId } = req.user;
    const { id } = req.params;

    try {
        const note = await Note.findOne({
            userId,
            _id: id,
            active: true
        });
    
        return res.status(200).json({
            note
        });
    } catch (error) {
        next(new ErrorHandler(500, 'An error ocurred'));
    }


}

const deleteNote = async (req = request, res = response, next) => {

    const { id } = req.params;

    try {
        await Note.findByIdAndUpdate(id, {
            active: false
        });
    
        return res.status(200).json({
            message: 'Note deleted successfuly'
        });
    } catch (error) {
        next(new ErrorHandler(500, 'An error ocurred'));
    }

}

const updateNote = async (req = request, res = response, next) => {

    const { id } = req.params;

    const { title, body } = req.body;

    try {
        await Note.findOneAndUpdate({
            _id: id,
            active: true
        }, {
            title,
            body
        });
    
        res.status(200).json({
            message: 'Note updated successfully'
        });
    } catch (error) {
        next(new ErrorHandler(500, 'An error ocurred'));
    }

}

module.exports = {
    createNote,
    readAllNotes,
    readNoteById,
    deleteNote,
    updateNote
}