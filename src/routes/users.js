const express = require("express")
const router = express.Router()
const data = require("../data")

// This is a mini app - kinda like Rails engine mounted on `/users`

router
  .get("/", (req, res) => {
    res.json(data.users)
  })
  .get("/:id", (req, res) => {
    let user = data.users.find(u => u.id === parseInt(req.params.id));
    res.json(user);
  })

module.exports = router
