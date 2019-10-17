let express = require('express');
let router = express.Router();
let file = require('../db/file.schema');
let multer = require('multer');
let path = require('path');
let port = 'http://localhost:4500/';
let pathDir = path.join(__dirname,'../uploads/');
let storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,pathDir);
    },
    filename: function(req,file,cb) {
        cb(null, Date.now() + file.originalname);
    }
});

let fileFilter = function(req,file,cb) {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null,true);
    } else {
        cb(null,false);
    }
};

let filestorage = multer({
    storage:storage,
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

router.post('/uploadfile', filestorage.single('image'), async(req,res) => {
    console.log(req.file);
    try {
    let data = new file({
        image: port + 'uploads/' + req.file.filename
    });
    if(!data) {return res.status(403).send({message:'Something went wrong'})}
    let saveImages = await data.save();
    res.send({message:'file uploaded', data:saveImages});
}
catch(ex) {
    res.send(ex.message);
}
});

module.exports = router;
