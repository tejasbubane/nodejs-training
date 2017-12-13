const mongoose = require("mongoose")

// Built-in validations -
// all fields have required
// strings have enum, match, minlength, maxlength
// numbers have min, max
// ref: http://mongoosejs.com/docs/validation.html

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Cannot create product without a name"],
    trim: true
  },
  imageUrl: { // optional
    type: String,
    match: [/^http:\/\/.+/, "Not a valid URL"]
  },
  description: {
    type: String,
    maxlength: 10
  },
  price: {
    type: Number,
    required: true,
    validate: (val) => val > 0
  }
})

module.exports = mongoose.model("Product", productSchema)
