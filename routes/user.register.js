let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let User = require('../db/user.register.schema');
let bcrypt = require('bcryptjs');

router.post('/userRegister', async(req,res) => {
    try {
        let {error} = ValidationError(req.body);
        if(error){return res.status(403).send(error.details[0].message)}
        let user = await User.findOne({"UserLogin.emailid": req.body.UserLogin.emailid});
        if(user) {return res.status(402).send({message:'this email id is already exists'})}
        let data = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            Address: req.body.Address,
            UserLogin:req.body.UserLogin
        });
        let salt = await bcrypt.genSalt(10);
         data.UserLogin.password = await bcrypt.hash(data.UserLogin.password, salt);
        let result = await data.save();
        res.send({message:'Welcome user we got your data! now lets go back to login page', data: result});
    }
    catch(ex) {
        res.send(ex.message);
    }

});

function ValidationError(message){
    let Schema  = Joi.object({
        firstname:Joi.string().min(5).max(250).required(),
        lastname: Joi.string().min(5).max(250).required(),
        Address:Joi.string().required(),
        UserLogin:{
            emailid:Joi.string().required(),
            password: Joi.string().required()
        }
    });
    return Schema.validate(message);
};

module.exports = router;