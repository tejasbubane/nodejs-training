const express = require("express")
const app = express()
const data = require('./data')

app.get("/", (req, res) => {
  res.send("Hello World...")
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

  res.json(products)
})

app.listen(3000, () => console.log("Listening on port 3000..."))
