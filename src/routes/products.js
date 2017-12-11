const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Product = mongoose.model("Product")

let index = (req, res) => {
  let { min_price, max_price } = req.query,
      products = Product.find();
 
  if(min_price && max_price) {
    products = products.where("price").gte(min_price).lte(max_price)
  }
  
  products.then(products => res.json(products))
}

let show = (req, res) => {
  Product.findOne({id: req.params.id})
    .then(product => res.json(product))
}

let create = (req, res) => {
  let productParams = req.body.product

  let product = new Product({
    name: productParams.name,
    price: productParams.price
  })

  product.save((err, product) => res.json(product))
}

router
  .get("/", index)
  .get("/:id", show)
  .post("/", create)

module.exports = router
