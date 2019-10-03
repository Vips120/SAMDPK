const express = require('express');
const router  = express.Router();
const Course = require('../db/userSchema');
const Joi = require('@hapi/joi');
//course by id
router.get('/:id', async (req,res) => {
  let data = await Course.findById(req.params.id)
                  .select(["courseName", "price"]);
  ;
  if(!data) {return res.status(404).send({message:'Invalid course id'})}
  res.send(data);
} );

//all courses
router.get('/', async(req,res) => {
    let data = await Course.find();
    res.send(data);
});

// create a new course
router.post('/newcourse', async(req,res) => {
    let {error} = ValidationError(req.body);
    if(error){return res.status(403).send(error.details[0].message)}
    let course = new Course({
        courseName:req.body.courseName,
        author:req.body.author,
        price: req.body.price
    });
let data = await course.save();
res.send({item: data});

});

// update course by id
router.put('/updatecourse/:id', async(req,res) => {
    try {
    let course = await Course.findById(req.params.id);
    if(!course) {return res.status(404).send({message:'Invalid course id'})}
    let {error} = ValidationError(req.body);
    if(error) {return res.status(403).send(error.details[0].message)}
    course.courseName = req.body.courseName;
    course.author = req.body.author;
    course.price = req.body.price;
    let data = await course.save();
    res.send({message:'updated the course item', item:data})
    }
    catch(Ex) {
        res.send(Ex.message);
    }
});

//remove course by id

router.delete('/removecourse/:id', async(req,res) => {
    let course = await Course.findByIdAndRemove(req.params.id);
    if(!course) {return res.status(404).send({message:'Invalid course id'})}
    res.send({message:'removed the data'})
});



function ValidationError(message) {
    let Schema = Joi.object().keys({
        courseName: Joi.string().min(5).max(250).required(),
        author: Joi.string().min(5).max(100).required(),
        price:Joi.number().required()
    });

  return  Schema.validate(message);
};

module.exports = router;
