let express = require('express');
let Joi = require('@hapi/joi');
let router = express.Router();
let users = [{
    id:1,
    name:'Angular'
},
 {
     id:2,
     name:'Typescript'
 },
 {
     id:3,
     name:'Javascript'
 },
 {
     id:4,
     name:'ReactJs'
 }
];

router.get('/', (req,res) => {
    res.send(users);
});

router.get('/:id', (req,res) => {
    let userId = users.find( data => data.id === parseInt(req.params.id));
    if(!userId) {return res.status(404).send({message:'Invalid userid'})}
    res.send(userId);
});

router.post('/newuser', (req,res) => {

    let {error} = ValidationError(req.body);
//   console.log(result.error);
if(error) {return res.send(error.details[0].message)}
   
    let data = {
        id: users.length + 1,
        name:req.body.name
    };
    users.push(data);
    res.send(users);
});


router.put('/updateuser/:id' , (req,res) => {
    let {error} = ValidationError(req.body);
    if(error){return res.send(error.details[0].message)}
    let user = users.find(data => data.id === parseInt(req.params.id));
    if(!user) {return res.status(404).send({message:'User id not found!'})}
    user.name = req.body.name;
    res.send(users);
});

router.delete('/removeuser/:id', (req,res) => {
    let user = users.find(data => data.id === parseInt(req.params.id));
    if(!user) {return res.status(404).send({message:'User id not found!'})}
    let index = users.indexOf(user);
    console.log(index);
    users.splice(index,1);
    res.send({messsage:'remove the data'})
});

  function ValidationError(message) {
    let Schema = Joi.object().keys({
        name: Joi.string().min(4).max(100).required()
    });
    return Schema.validate(message);
  };

  module.exports = router;