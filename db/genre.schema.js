let mongoose = require('mongoose');
let genreSchema = new mongoose.Schema({
    name: {type:String,required:true, minlength:2, maxlength:100}
});

let Genre = mongoose.model('Genre', genreSchema);
module.exports = {genreSchema,Genre};