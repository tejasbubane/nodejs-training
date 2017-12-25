// Database Setup
const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const uri = "mongodb://localhost:27017/my-store"
mongoose.connect(uri, {useMongoClient: true})

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

const logger = (req, res, next) => {
  let start = new Date()
  console.log(`${start} : ${req.method} ${req.originalUrl}`)
  next()

  // This will not work!
  // let stop = new Date()
  // console.log(`${res.statusCode} [${stop - start}ms]`)
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World...")
})

app.use("/api", apiRoutes)

app.listen(3000, () => console.log("Listening on port 3000..."))
