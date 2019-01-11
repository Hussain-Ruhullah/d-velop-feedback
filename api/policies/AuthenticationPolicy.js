const passport = require('passport');

exports.authenticate = function(req,res,next) {
    
    if (req.isAuthenticated()) {
        next();
    }
    else {
        passport.authenticate('google', {
            failureRedirect: '/'
        })(req,res,next);
    }
}

exports.isAdmin = function(req,res,next) {
    
    if (req.user && req.user.isAdmin) {
        
        next();
    }
    else {
        res.status(401).send({ message: "user is unauthorized"});
    }
}