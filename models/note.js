const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    title : {
        type : String,
        default : 'Add title' 
    },
    body : {
        type : String,
        default : 'Write something interesting...'
    },
    files : {
        type : [String],
        default : []
    },
    userId : {
        type : String,
        require : true
    },
    active : {
        type : Boolean,
        defult : true
    }
});


NoteSchema.methods.toJSON = function(){

    const {__v, _id, userId, active, ...note} = this.toObject();

    return note;

}

const Note = model('Note', NoteSchema);


module.exports = {
    Note,
    NoteSchema
}