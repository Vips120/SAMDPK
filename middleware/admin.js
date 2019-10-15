function Admin(req,res,next) {
    if(!req.user.isAdmin) {
        return res.status(403).send({message:'ACCESS DENIED.'})
    };
    next();
};

module.exports = Admin;