let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let Joi = require('@hapi/joi');
let config = require('config');
let UserRegisterSchema = new mongoose.Schema({
    firstname:{type:String,required:true,minlength:5, maxlength:250},
    lastname:{type:String,required:true,minlength:5, maxlength:250},
    Address:{type:String,required:true},
    UserLogin:{
        emailid:{type:String, required:true, unique:true},
        password:{type:String,required:true}
    }
});
UserRegisterSchema.methods.Generatetoken = function(){
    let token = jwt.sign({_id: this._id},config.get('Pkapps'));
    return token;
}

let User = mongoose.model('Users', UserRegisterSchema);
function ValidationError(message){
    let Schema  = Joi.object({
        firstname:Joi.string().min(5).max(250).required(),
        lastname: Joi.string().min(5).max(250).required(),
        Address:Joi.string().required(),
        UserLogin:{
            emailid:Joi.string().required().email(),
            password: Joi.string().required()
        }
    });
    return Schema.validate(message);
};


module.exports = {User, ValidationError};