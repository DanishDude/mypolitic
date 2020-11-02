const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

class passportManager {
  initialize(){
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: process.env.PRIVATE_KEY
    };

    passport.use(new Strategy(opts, (jwt_payload, done) => {
      User.findOne({_id: jwt_payload._id}, (err, user) => {
        if (err) {
          done(err, false)
        };
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      }).select(['email', 'password', 'userType']);
    }));
    return passport.initialize();
  }

  authenticate(req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
      if (err) return next(err);
      
      if (!user) {
        if (info.name === 'TokenExpiredError') {
          return res.status(401).json({msg: 'token expired'})
        } else {
          return res.status(401).json({msg: info.message});
        }
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
}

module.exports = new passportManager();
