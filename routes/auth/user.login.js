let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let U = require('../../db/user.register.schema');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
router.post('/auth', async(req,res) => {
  let user = await U.User.findOne({"UserLogin.emailid": req.body.UserLogin.emailid});
  if(!user){return res.status(403).send({message:'Invalid emailid please try again'})}
  let {error} = ValidationError(req.body);
  if(error) {return res.status(403).send(error.details[0].message)}
   let password = await bcrypt.compare(req.body.UserLogin.password, user.UserLogin.password);
    if(!password) {return res.status(403).send({message: 'Invalid password!'})}
    let token = user.Generatetoken();
    res.send({message:'Login Successful', d:token});
});

function ValidationError(error){
    let Schema = Joi.object({
        UserLogin:{
            emailid: Joi.string().required().email(),
            password:Joi.string().required()
        }
    });
return Schema.validate(error);

};

module.exports = router;