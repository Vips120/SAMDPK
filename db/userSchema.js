const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    courseName: {type:String,maxlength:250, minlength:5, required:true},
    author:{type:String, maxlength:100, minlength:5,required:true},
    price:{type:Number,required:true}
});

let Course = mongoose.model('courseInfo', Schema);
module.exports = Course;