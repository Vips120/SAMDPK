let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let U = require('../../db/user');
let bcrypt = require('bcrypt');
let auth = require('../../middleware/user.auth');
router.post('/auth',async(req,res) => {
  let user = await U.User.findOne({"UserLogin.emailid": req.body.UserLogin.emailid});
  if(!user){return res.status(403).send({message:'Invalid emailid please try again'})}
  let {error} = ValidationError(req.body);
  if(error) {return res.status(403).send(error.details[0].message)}
   let password = await bcrypt.compare(req.body.UserLogin.password, user.UserLogin.password);
    if(!password) {return res.status(403).send({message: 'Invalid password!'})}
    let token = user.Generatetoken();
    res.header('x-auth-token', token).send({message:'Login Successful', t: token});
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