function Logger(req,res,next) {
    console.log('wait a second let me check something.');
    next();
}

module.exports = Logger;