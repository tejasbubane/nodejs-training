const express = require("express")
const app = express()

const userRoutes = require("./routes/users")
const productRoutes = require("./routes/products")

app.get("/", (req, res) => {
  res.send("Hello World...")
})

app.use("/users", userRoutes)
app.use("/products", productRoutes)

app.listen(3000, () => console.log("Listening on port 3000..."))
