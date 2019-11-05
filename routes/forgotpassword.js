let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let bcrypt = require('bcrypt');
let model = require('../db/user');


router.post('/forgotpassword/:id', async(req,res) => {
    try{
  let user = await model.User.findOne({resetPasswordToken: req.params.id, 
       resetPasswordExpires: {$gt:Date.now()}});
     if(!user) {return res.status(401).send({message:'Invalid token'})}
     let {error} = ValidationError(req.body);
     if(error) {return res.send(err.details[0].message)}
     console.log(user.UserLogin.password);
     console.log(req.body.UserLogin.password);
    let comparepassword = await bcrypt.compare(req.body.UserLogin.password,user.UserLogin.password);
    console.log(comparepassword);
     if(comparepassword) {return res.status(401).send({message:'this is old password make a new password!'})}
     let salt = await bcrypt.genSalt(10);
      user.UserLogin.password = await bcrypt.hash(req.body.UserLogin.password, salt);
    user.resetPasswordExpires = undefined;
    user.resetPasswordToken = undefined;
      let data = await user.save();
      res.send({message:'password updated! Congrats, have a great day.:)', d:data})
  }
  catch(ex) {
      res.send(ex.message);
  }

});

function ValidationError(message) {
    let Schema = Joi.object({
        UserLogin:{
            password: Joi.string().required()
        }
    });
return Schema.validate(message);
}
module.exports = router;