const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
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
  },
  slug: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

productSchema.pre("validate", function(next) {
  if(this.isModified("name")) {
    this.slug = this.name.replace(/\s/g, "-").toLowerCase()
  }
  next()
})

module.exports = mongoose.model("Product", productSchema)
