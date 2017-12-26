const passport = require("passport");
const passportJWT = require("passport-jwt");

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret"
}

// Signature: done(error, user, options={message: ""})

const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
  User.findOne({id: jwt_payload.sub})
    .then(user => {
      if(user) return done(null, user)
      else return done(null, false)
    })
    .catch(err => done(err, false))
})

passport.use(strategy);

module.exports = passport;
