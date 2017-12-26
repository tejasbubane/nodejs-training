const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: String,
  email: {
    type: String,
    required: true, 
    match: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Invalid email"]
  },
  hashPassword: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  watchlist: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }]
})

userSchema.pre("validate", function(next) {
  if(this.isModified("first_name") || this.isModified("last_name")) {
    this.slug = `${this.first_name}-${this.last_name}`.toLowerCase()
  }
  next()
})

userSchema.virtual("full_name").get(function() {
  return [this.first_name, this.last_name].join(" ")
})

userSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "creator",

  // Ask multiple documents - by default returns one
  justOne: false
})

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hashPassword)
}

module.exports = mongoose.model("User", userSchema)
