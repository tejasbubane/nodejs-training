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
const logger = require("./middlewares/logger")
const errorHandlers = require("./middlewares/errorHandlers")

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);

app.get("/", (req, res) => {
  res.send("My Store App")
})

app.use("/api", apiRoutes)

// we cannot write response logger here
// since request is ended with res.json in routes - it will not reach here

// Error Handlers
// Calling next on errors in routes - will land here
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

app.listen(3000, () => console.log("Listening on port 3000..."))
