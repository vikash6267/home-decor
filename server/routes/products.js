const express = require("express")
const router = express.Router()

const{
    auth,
    isAdmin,
    isCustomre
}= require("../middlewares/auth")



// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
    editCategory,
  } = require("../controllers/Category")

const {
    createProduct,
    getAllProduct,
    getProductDetails
} = require("../controllers/productCtrl")





router.post("/createCategory",  createCategory)
router.post("/editCategory" ,auth, isAdmin,editCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)


router.post("/create",createProduct)
router.post("/getProductDetails" , getProductDetails)
router.get("/all-product",getAllProduct)



// export all router
module.exports = router


