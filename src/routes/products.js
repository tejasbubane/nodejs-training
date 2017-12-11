const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Product = mongoose.model("Product")

let index = (req, res) => {
  let { min_price, max_price } = req.query,
      products = Product.find();
 
  if(min_price && max_price) {
    products = products.where("price")
                       .gte(parseInt(min_price))
                       .lte(parseInt(max_price))
  }
  
  products.then(products => res.json(products))
}

let show = (req, res) => {
  Product.findOne({id: parseInt(req.params.id)})
    .then(product => res.json(product))
}

router
  .get("/", index)
  .get("/:id", show)

module.exports = router
