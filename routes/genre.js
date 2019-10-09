let express = require('express');
let router = express.Router();
let G = require('../db/genre.schema');
let Joi = require('@hapi/joi');

router.post('/genre', async(req,res) => {
 let {error} = ValidationError(req.body);
 if(error){return res.status(403).send(error.details[0].message)};
 let data = new G.Genre({
     name: req.body.name
 });
 let result = await data.save();
 res.send({message:'Genre created', d:result})
});

function ValidationError(message){
    let Schema = Joi.object({
        name:Joi.string().required().min(2).max(100)
    });
    return Schema.validate(message);
}

module.exports = router;