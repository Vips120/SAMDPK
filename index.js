let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
app.use(express.json());
let config = require('config');
// app.use(express.urlencoded());
let port = process.env.PORT || 4500;
let user = require('./routes/user');
let courses = require('./routes/courses');
let logger = require('./middleware/log');
let genre = require('./routes/genre');
let movie = require('./routes/movies');
let UserRegister = require('./routes/user.register');
app.use(logger);
app.use(morgan('tiny'));
console.log(`production: ${process.env.NODE_ENV}`);
console.log(`development: ${app.get('env')}`);
console.log(`development: ${config.get('info')}`);
console.log(`production: ${config.get('info')}`);
if(process.env.NODE_ENV === 'production'){
    console.log(`production: ${config.get('user')}`);
    console.log(`password: ${config.get('password')}`);
};



mongoose.connect('mongodb://localhost/SAMPDPK', {useNewUrlParser:true,useUnifiedTopology: true })
             .then(() => console.log(`connected to the database`))
             .catch(err => console.log(`something went wrong ${err.message}`));

app.listen(port, () => console.log(`this app is working on port number ${port}`));
app.use('/api/users/', user);
app.use('/api/courses/', courses);
app.use('/api/movie/', genre);
app.use('/api/movie/', movie);
app.use('/api/customer/', UserRegister);