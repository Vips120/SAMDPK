let express = require('express');
let app = express();
let morgan = require('morgan');
app.use(express.json());
let config = require('config');
// app.use(express.urlencoded());
let port = process.env.PORT || 4500;
let user = require('./routes/user');
let logger = require('./middleware/log');
app.use(logger);
app.use(morgan('tiny'));
console.log(`production: ${process.env.NODE_ENV}`);
console.log(`development: ${app.get('env')}`);
console.log(`development: ${config.get('info')}`);
console.log(`production: ${config.get('info')}`);
if(process.env.NODE_ENV === 'production'){
    console.log(`production: ${config.get('user')}`);
    console.log(`password: ${config.get('password')}`);
}


app.use('/api/users/', user);
app.listen(port, () => console.log(`this app is working on port number ${port}`));