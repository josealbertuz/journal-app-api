const { response, request } = require('express');
const { Note } = require('../models/note');


const createNote = async (req = request, res = response) => {

     
    const { title, body } = req.body;

    const {uid : userId} = req.user;

    const note = new Note({title, body, userId});


    await note.save();

    return res.status(201).json({
        message : 'Note created successfully'
    });


}

const readNote = async (req = request, res = response, next) => {

    const { offset = 0, limit = 5 } = req.query;

    const {uid : userId} = req.user;

    const [notes, results] = await Promise.all([
        Note.find({
            userId,
            active: true
        }).skip(offset).limit(limit),
        Note.countDocuments({
            userId,
            active: true
        })
    ]);

    return res.status(200).json({
        results,
        notes
    });
}

const deleteNote = async (req = request, res = response, next) => {

    const { id } = req.params;

    await Note.findByIdAndUpdate(id, {
        active : false
    });

    return res.status(200).json({
        message : 'Note deleted successfuly'
    });

}

const updateNote = async (req = request, res = response, next) => {

    const {_id, id, userId, files = [], ...note} = req.body;

    await Note.findOneAndUpdate({
        _id : id,
        active : true
    }, {
        note,
        $push : {
            files : {
                $each : files,
                $slice : -5
            }
        }
    });

    res.status(200).json({
        message : 'Note updated successfully'
    });

}

module.exports = {
    createNote,
    readNote,
    deleteNote,
    updateNote
}