const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    title : {
        type : String,
        require : true
    },
    body : {
        type : String,
        require : true
    },
    files : {
        type : [String],
        default : []
    },
    category : {
        type : String,
        default : 'No category'
    },
    userId : {
        type : String,
        require : true
    }
}, {
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});

const Note = model('Note', NoteSchema);


module.exports = {
    Note,
    NoteSchema
}