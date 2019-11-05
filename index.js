let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
app.use(express.json());
let config = require('config');
let path = require('path');
// app.use(express.urlencoded());
let port = process.env.PORT || 4500;
let user = require('./routes/user');
let courses = require('./routes/courses');
let logger = require('./middleware/log');
let genre = require('./routes/genre');
let movie = require('./routes/movies');
let UserRegister = require('./routes/user.register');
let UserLogin = require('./routes/auth/user.login');
let imageFile = require('./routes/file.uploads');
let mailer = require('./routes/mailer');
let forgotpassword = require('./routes/forgotpassword');
app.use(logger);
app.use(morgan('tiny'));
console.log(express.static(__dirname));
app.use('/uploads',express.static(__dirname + '/uploads'));

console.log(`production: ${process.env.NODE_ENV}`);
console.log(`development: ${app.get('env')}`);
console.log(`development: ${config.get('info')}`);
console.log(`production: ${config.get('info')}`);
console.log(`production: ${config.get('Pkapps')}`);
if(process.env.NODE_ENV === 'production'){
    console.log(`production: ${config.get('user')}`);
    console.log(`password: ${config.get('password')}`);
};

if(!config.get("Pkapps")) {
    console.log('FATAL ERROR: SET ENVIROMENT VAIRABLES');
    process.exit(1);
}



mongoose.connect('mongodb://localhost/SAMPDPK', {useNewUrlParser:true,useUnifiedTopology: true })
             .then(() => console.log(`connected to the database`))
             .catch(err => console.log(`something went wrong ${err.message}`));

app.listen(port, () => console.log(`this app is working on port number ${port}`));
app.use('/api/users/', user);
app.use('/api/courses/', courses);
app.use('/api/movie/', genre);
app.use('/api/movie/', movie);
app.use('/api/customer/', UserRegister);
app.use('/api/customer/', UserLogin);
app.use('/api/imageupload', imageFile);
app.use('/api/', mailer);
app.use('/api/', forgotpassword);