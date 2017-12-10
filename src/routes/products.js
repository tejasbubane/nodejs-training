const express = require("express")
const router = express.Router()
const data = require("../data")

// Now that we have our own little separate file - refactor your hearts out!

// Separate functions!!
let filterProducts = (products, {min_price, max_price}) => {
  if(min_price && max_price) {
    return products.filter(product => (
      product.price >= min_price && product.price <= max_price
    ))
  } else return products;
}

// RESTful actions!!
let index = (req, res) => {
  let products = data.products,
      { min_price, max_price } = req.query,
      filters = {min_price: parseInt(min_price), max_price: parseInt(max_price)};

  res.json(filterProducts(data.products, filters))
}

let show = (req, res) => {
  let product = data.products.find(u => u.id === parseInt(req.params.id));
  res.json(product);
}

router
  .get("/", index)
  .get("/:id", show)

module.exports = router
