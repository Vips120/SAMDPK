let mongoose = require('mongoose');
let Genre = require('./genre.schema');
let movieSchema = new mongoose.Schema({
    name:{type:String,required:true,minlength:5, maxlength:100},
    genre:{type: Genre.genreSchema,required:true},
    title:{type:String,required:true},
    rating:{type:Number,required:true}
});

let Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;