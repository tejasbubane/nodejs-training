const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
const User = mongoose.model("User")

let index = (req, res) => {
  User.find().then(users => res.json(users))
}

let show = (req, res) => {
  User.findOne({slug: req.params.id})
    .then(user => populate(user))
    .then(user => res.json(serialize(user)))
}

let create = (req, res) => {
  let user = new User(userParams(req.body.user))

  user.save()
    .then(user => populate(user))
    .then(user => res.json(serialize(user)))
    .catch(err => res.status(500).json(err))  
}

// let and const are not hoisted
// use `var` if you want the function below
var serialize = user => ({
  ...user._doc,
  full_name: user.full_name,
  products: user.products,
  watchlist: user.watchlist
})

var populate = user =>
    user.populate("products", {name: 1})
    .populate("watchlist", {name: 1, price: 1})
        .execPopulate()

var userParams = params => (
  {
    first_name: params.first_name,
    last_name: params.last_name,
    email: params.email,
    watchlist: params.watchlist.map(p => new mongoose.Types.ObjectId(p))
  }
)

router
  .get("/", index)
  .get("/:id", show)
  .post("/", create)

module.exports = router
