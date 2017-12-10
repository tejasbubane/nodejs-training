const express = require("express")
const app = express()
const data = require('./data')
const path = require("path")

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.get("/", (req, res) => {
  // res.send("Hello World...")
  res.render("index", {title: "My Store", message: "Welcome to my store!"})
})

app.get("/users", (req, res) => {
  res.json(data.users)
})

// Route params
// Find user with given id
app.get("/users/:id", (req, res) => {
  let user = data.users.find(u => u.id === parseInt(req.params.id));
  res.json(user);
})

// Query params
// Filter products by price range
app.get("/products", (req, res) => {
  let products = data.products,
      { min_price, max_price } = req.query;
  if(min_price && max_price) {
    products = products.filter(
      product => product.price >= parseInt(min_price) && product.price <= parseInt(max_price)
    )
  }

  // res.json(products)
  res.render("products", { products })
})

app.get("/products/:id", (req, res) => {
  let product = data.products.find(u => u.id === parseInt(req.params.id));
  res.json(product);
})

app.listen(3000, () => console.log("Listening on port 3000..."))
