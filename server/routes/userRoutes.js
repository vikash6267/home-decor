// Import the required modules
const express = require("express")
const router = express.Router()

const{
    login,
    signup,
   
    fetchMyProfile
} = require("../controllers/Auth")

const{
    referCode
} = require("../controllers/referCodeKnow")
const{
    auth,
    isCustomre
} = require("../middlewares/auth")

router.post("/login", login)


router.post("/signup", signup)
router.post("/refer", referCode)



router.get("/fetchMyProfile",auth,fetchMyProfile )




module.exports = router
