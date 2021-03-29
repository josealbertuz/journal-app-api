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