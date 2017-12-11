const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
const User = mongoose.model("User")

// This is a mini app - kinda like Rails engine mounted on `/users`

router
  .get("/", (req, res) => {
    User.find().then(users => res.json(users))
  })
  .get("/:id", (req, res) => {
    User.findOne({id: req.params.id}).then(user => res.json(user))
  })

module.exports = router
