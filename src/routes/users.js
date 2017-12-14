const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
const User = mongoose.model("User")

let index = (req, res) => {
  User.find().then(users => res.json(users))
}

let show = (req, res) => {
  User.findOne({slug: req.params.id})
    .then(user => user.populate("products", {name: 1, price: 1}).execPopulate())
    .then(user => res.json(serialize(user)))
}

let create = (req, res) => {
  let userParams = req.body.user

  let user = new User({
    first_name: userParams.first_name,
    last_name: userParams.last_name,
    email: userParams.email
  })
  user.save()
    .then(user => res.json(serialize(user)))
    .catch(err => res.status(500).json(err))  
}

// let and const are not hoisted
// use `var` if you want the function below
var serialize = user => (
  {...user._doc, full_name: user.full_name, products: user.products}
)

router
  .get("/", index)
  .get("/:id", show)
  .post("/", create)

module.exports = router
