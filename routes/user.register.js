let express = require('express');
let router = express.Router();
let U = require('../db/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let auth = require('../middleware/user.auth');
let admin = require('../middleware/admin');
router.get('/me', auth,async(req,res) => {
    let data = await U.User.findById(req.user._id).select(["firstname", "lastname", "Address"]);
    res.send(data);
})

router.post('/userRegister', async(req,res) => {
    try {
        let {error} = U.ValidationError(req.body);
        if(error){return res.status(403).send(error.details[0].message)}
        let user = await U.User.findOne({"UserLogin.emailid": req.body.UserLogin.emailid});
        if(user) {return res.status(402).send({message:'this email id is already exists'})}
        let data = new U.User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            Address: req.body.Address,
            UserLogin:req.body.UserLogin
        });
        let salt = await bcrypt.genSalt(10);
         data.UserLogin.password = await bcrypt.hash(data.UserLogin.password, salt);
        let result = await data.save();
        let token = result.Generatetoken();
        res.header('x-auth-token', token).send({message:'Welcome user we got your data! now lets go back to login page', data: result});
    }
    catch(ex) {
        res.send(ex.message);
    }

});

//delete the user

router.delete('/removecustomer/:id', [auth,admin], async(req,res) => {
    let data = await U.User.findByIdAndRemove(req.params.id);
    if(!data) {res.status(403).send({message:'Invalid user id'})}
    res.send({message:'User Deleted! See you next time :`('})
});

//pagination

router.post('/:page', async(req,res) => {
    let perPage = 5;
    let currentPage = req.params.page || 1;
    let data = await U.User
                       .find({})
                       .skip((perPage * currentPage) - perPage)
                       .limit(perPage);
      let dataCount = await U.User.find().count();
      let pageSize = Math.ceil(dataCount/perPage);
      res.send({
          perPage: perPage,
          currentPage: currentPage,
          dataSize: data,
          pageSize: pageSize
      });            
})

//IEP -> Information Expert Principle
module.exports = router;