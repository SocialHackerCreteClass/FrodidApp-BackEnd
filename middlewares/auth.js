const auth = (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization === req.session.token){
        next();
    } else {
        res.send("You have to login to proceed");
    }
}

module.exports = auth;