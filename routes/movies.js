let express = require('express');
let router = express.Router();
let M = require('../db/movie.schema');
let G = require('../db/genre.schema');
let Joi = require('@hapi/joi');

 router.get('/allmovielist', async(req,res) => {
    let result = await M.find();
    res.send(result);
 });

router.post('/createmovie', async(req,res) => {
     let {error} = ValidationError(req.body);
     if(error){return res.status(403).send(error.details[0].message)}
     let Genre = await G.Genre.findById(req.body.genreId);
     if(!Genre) {return res.status(404).send('invalid genre id')}
     console.log(Genre.name);
     let Movie = new M({
             name: req.body.name,
             genre: {
                 _id: Genre._id,
                 name: Genre.name
             },
             title: req.body.title,
             rating:req.body.rating
     });
     let data = await Movie.save();
     res.send({message:'We got movie record here', item: data});
});

function ValidationError(message){
    let Schema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        genreId: Joi.string().required(),
        title:Joi.string().required(),
        rating: Joi.number().required()
    });
    return Schema.validate(message);
};
module.exports = router;
