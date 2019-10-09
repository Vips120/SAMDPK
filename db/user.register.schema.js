let mongoose = require('mongoose');
let UserRegisterSchema = new mongoose.Schema({
    firstname:{type:String,required:true,minlength:5, maxlength:250},
    lastname:{type:String,required:true,minlength:5, maxlength:250},
    Address:{type:String,required:true},
    UserLogin:{
        emailid:{type:String, required:true, unique:true},
        password:{type:String,required:true}
    }
});

let User = mongoose.model('Users', UserRegisterSchema);

module.exports = User;