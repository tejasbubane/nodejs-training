const express = require("express")
const app = express()
const data = require('./data')

app.get("/", (req, res) => {
  res.send("Hello World...")
})

app.get("/users", (req, res) => {
  res.json(data.users)
})

app.get("/products", (req, res) => {
  res.json(data.products)
})

app.listen(3000, () => console.log("Listening on port 3000..."))
