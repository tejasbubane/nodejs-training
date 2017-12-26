const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
const saltRounds = 10

const userRoutes = require("./users")
const productRoutes = require("./products")
const { passport, jwtOpts } = require("../middlewares/passport")

const mongoose = require("mongoose")
const User = mongoose.model("User")

// Nested routes!!
router.use(passport.initialize())

const register = (req, res, next) => {
  let user = new User(req.body)
  bcrypt.hash(req.body.password, saltRounds)
    .then(hash => {
      user.hashPassword = hash

      user.save()
        .then(user => {
          res.json({...user._doc, hashPassword: undefined})
        })
        .catch(err => next(err))
    })
}

const login = (req, res) => {
  let { email, password } = req.body;

  User.findOne({email: email})
    .then(user => {
      if(user && user.comparePassword(password)) {
        let payload = {id: user.id}
        let token = jwt.sign(payload, jwtOpts.secretOrKey)
        res.set({"Authorization": `Bearer ${token}`})
          .json({message: "ok", token: token})
      }
      else {
        res.status.json({message: "Email/Password does not match"})
      }
    })
}

router
  .post("/register", register)
  .post("/login", login)

router.use("/users", passport.authenticate('jwt', { session: false }), userRoutes)
router.use("/products", passport.authenticate('jwt', { session: false }), productRoutes)

module.exports = router
