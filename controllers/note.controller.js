const { response, request } = require('express');
const { Note } = require('../models/note');


const createNote = async (req = request, res = response) => {

    const { uid: userId } = req.user;

    const note = new Note({ userId });

    const { _id: noteId } = await note.save();

    return res.status(201).json({
        noteId
    });

}

const readAllNotes = async (req = request, res = response, next) => {

    const { uid: userId } = req.user;

    const notes = Note.find({
        userId,
        active : true
    });

    return res.status(200).json({
        notes
    });
}

const readNoteById = async (req = request, res = response) => {

    const { uid: userId } = req.user;
    const { id } = req.params;

    const note =await Note.findOne({
        userId,
        _id : id,
        active : true
    });

    return res.json({
        note
    });


}

const deleteNote = async (req = request, res = response, next) => {

    const { id } = req.params;

    await Note.findByIdAndUpdate(id, {
        active: false
    });

    return res.status(200).json({
        message: 'Note deleted successfuly'
    });

}

const updateNote = async (req = request, res = response, next) => {

    const { id } = req.params;

    const { title, body } = req.body;

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

}

module.exports = {
    createNote,
    readAllNotes,
    readNoteById,
    deleteNote,
    updateNote
}