// Import the required modules
const express = require("express")
const router = express.Router()


const {
    addToWishlist,
    removeFromWishlist,
    getUserWishlist
} = require("../controllers/wishlist")

const{
    auth,
    isCustomre
} = require("../middlewares/auth")


router.post("/addtowish", auth,isCustomre, addToWishlist)
router.delete("/removetowish", auth,isCustomre, removeFromWishlist)
router.get("/getWishlist", auth,isCustomre, getUserWishlist)


module.exports = router



