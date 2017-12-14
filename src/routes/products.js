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
  Product.findOne({slug: req.params.id})
    .then(product => res.json(product))
}

let buildProduct = params => (
  new Product({
    name: params.name,
    imageUrl: params.imageUrl,
    price: params.price,
    description: params.description,
    creator: new mongoose.Types.ObjectId(params.creator)
  })
)

let create = (req, res) => {
  let product = buildProduct(req.body.product)

  product.save()
    .then(product => product.populate("creator").execPopulate())
    .then(product => res.json(product))
    .catch(err => res.status(500).json(err))
}

router
  .get("/", index)
  .get("/:id", show)
  .post("/", create)

module.exports = router
