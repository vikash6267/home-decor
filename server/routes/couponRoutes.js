const express = require("express")
const router = express.Router()

const{
    auth,
    isAdmin,
    isCustomre
}= require("../middlewares/auth")


const {
    createCoupon,
    getCouponByName
} = require("../controllers/couponCtrl")


router.post("/create",createCoupon)
router.post("/get",getCouponByName)



module.exports = router


