const express = require("express")
const app = express()

const apiRoutes = require("./routes/index")

app.get("/", (req, res) => {
  res.send("Hello World...")
})

app.use("/api", apiRoutes)

app.listen(3000, () => console.log("Listening on port 3000..."))
