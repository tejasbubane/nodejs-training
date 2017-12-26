const express = require("express")
const router = express.Router()

const userRoutes = require("./users")
const productRoutes = require("./products")
const passport = require("../middlewares/passport")

// Nested routes!!
router.use(passport.initialize())
router.use("/users", passport.authenticate('jwt', { session: false }), userRoutes)
router.use("/products", productRoutes)

module.exports = router
