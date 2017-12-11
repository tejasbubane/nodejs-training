// Database Setup
const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const uri = "mongodb://localhost:27017/my-store"
mongoose.connect(uri)

require("./models/User")
require("./models/Product")

// App routes setup
const express = require("express")
const app = express()
const apiRoutes = require("./routes/index")
const bodyParser = require("body-parser")

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World...")
})

app.use("/api", apiRoutes)

app.listen(3000, () => console.log("Listening on port 3000..."))
