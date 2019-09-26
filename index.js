let express = require('express');
let app = express();
let Joi = require('@hapi/joi');
app.use(express.json());
let port = process.env.PORT || 4500;
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
//get api
// app.get('/api/users', (req,res) => {
//     res.send('hello user');
// });

// app.get('/api/users/:id', (req,res) => {
//     let id = req.params.id;
//     res.send(id);
// });

app.get('/api/users', (req,res) => {
    res.send(users);
});

app.get('/api/users/:id', (req,res) => {
    let userId = users.find( data => data.id === parseInt(req.params.id));
    if(!userId) {return res.status(404).send({message:'Invalid userid'})}
    res.send(userId);
});

app.post('/api/users/newuser', (req,res) => {
    let Schema = Joi.object().keys({
        name: Joi.string().min(4).max(100).required()
    });
    let {error} = Schema.validate(req.body);
//   console.log(result.error);
if(error) {return res.send(error.details[0].message)}
   
    let data = {
        id: users.length + 1,
        name:req.body.name
    };
    users.push(data);
    res.send(users);
});



app.listen(port, () => console.log(`this app is working on port number ${port}`));