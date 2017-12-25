const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Product = mongoose.model("Product")
const User = mongoose.model("User")

const { catchErrors } = require("../middlewares/errorHandlers")

let filteredProducts = query => {
  let { min_price, max_price, category } = query,
      products = Product.find()
 
  // Filter by min and max price
  if(min_price && max_price) {
    products = products.where("price").gte(min_price).lte(max_price)
  }
  // Filter by categories
  else {
    products = products.where("categories").equals(category)
  }
  return products.exec()
}

let index = (req, res) => {
  filteredProducts(req.query)
    .then(products => res.json(products))
}

let show = (req, res, next) => {
  return Product.findOne({slug: req.params.id})
    .then(product => {
      if(product) return populate(product)
      else return next(new Error(`Product "${req.params.id}" not found!`))
    })
    .then(product => res.json(serialize(product)))
}

let buildProduct = params => (
  new Product({
    name: params.name,
    imageUrl: params.imageUrl,
    price: params.price,
    description: params.description,
    creator: new mongoose.Types.ObjectId(params.creator),
    categories: params.categories
  })
)

let create = (req, res, next) => {
  let product = buildProduct(req.body.product)

  return product.save()
    .then(product => populate(product))
    .then(product => res.json(serialize(product)))
}

let categories = (req, res) => (
  Product.aggregate()
    .unwind("$categories")
    .group({ _id: "$categories", count: { "$sum": 1 } })
    .sort({ count: -1 })
    .exec()
    .then(categories => res.json(categories))
)

let popular = (req, res) => {
  Product.aggregate()
    .lookup({ from: "users", localField: "_id",
              foreignField: "watchlist", as: "watchers" })
    .unwind("$watchers")
    .group({_id: {_id: "$_id", name: "$name"}, count: { "$sum": 1 }})
    .sort({ count: -1 })
    .limit(5)
    .exec()
    .then(products => res.json(products))
}

var populate = product =>
    product
      .populate("creator", "first_name last_name")
      .populate("watchers", "first_name last_name")
      .execPopulate()

var serialize = product =>
    ({...product._doc, creator: product.creator, watchers: product.watchers })

router
  .get("/categories", categories)
  .get("/popular", popular)
  .get("/", index)
  .get("/:id", catchErrors(show))
  .post("/", catchErrors(create))

module.exports = router
