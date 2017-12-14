const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: String,
  email: {
    type: String,
    required: true, 
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email"]
  },
  slug: {
    type: String,
    required: true
  }
})

userSchema.pre("validate", function(next) {
  if(this.isModified("first_name") || this.isModified("last_name")) {
    this.slug = `${this.first_name}-${this.last_name}`.toLowerCase()
  }
  next()
})

module.exports = mongoose.model("User", userSchema)
