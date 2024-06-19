// const instance = require ("../config/razorpay")
const Order = require("../models/Order")
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid');
const Product = require("../models/Product")
const { instance } = require("../config/razorpay")
const mailSender = require("../utills/mailSender")
const crypto = require("crypto")


const Coupon = require("../models/Coupon")
const User = require("../models/User")




const capturePayment = async (req, res) => {
  const { products ,coupon} = req.body

console.log("enter payment")

  if (products.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0;

 
    for (const item of products) {
      const product_id = item.product._id;
      let product;

      try {
        product = await Product.findById(product_id);

        if (!product) {
          return res.status(200).json({ success: false, message: "Could not find the Product" });
        }

        total_amount += product.price * item.quantity;
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
      }
   
  }

  console.log("total ammont - ", total_amount)


  if(coupon !==""){
    const couponValue = await Coupon.findOne({ name: coupon.toUpperCase() });

    if (couponValue) {
      total_amount -= couponValue.discount

    }
  }
  const options = {
    amount: total_amount * 100,
    currency: "INR",
    // receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })

    console.log(paymentResponse)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}


const paymentVerification = async (req, res) => {
  console.log("enter verify")
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const product = req.body?.products
    const address = req.body?.address
    const payable = req.body?.payable
  
  const userId = req.user.id

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
      if (expectedSignature === razorpay_signature) {
        try {
          // Call the createOrder function
          await createOrder(product, userId, address, razorpay_order_id, razorpay_payment_id, payable, res);
      
          // Send the response after the order is successfully created
          return res.status(200).json({ success: true, message: "Payment Verified" });
        } catch (error) {
          // Handle any errors that occur during order creation
          console.error("Error creating order:", error);
          return res.status(500).json({ success: false, message: "Error creating order" });
        }
      }
      
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
};






const createOrder = asyncHandler(async (products, userId, address, razorpay_order_id, razorpay_payment_id,payable, res) => {
  const userDetails = await User.findById(userId);
console.log(payable)
  const {
    billingCity,
    billingPincode,
    billingState,
    billingCountry,
    billingAddress,
    billingPhone
  } = address;


  const email = userDetails.email;

  try {
         const orderId = uuidv4();

    const order = await Order.create({
      order_id: orderId, // Provide order_id
      shipment_id: 123, // Example shipment_id
      user: userId,
      shippingInfo: {
              name: userDetails.name, // assuming user has a name field
              address: billingAddress,
              city: billingCity,
              state: billingState,
              pincode: billingPincode,
            },
      paymentInfo: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      },
      orderItems: products.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice: payable, // Update with actual total price
    });



    for (const item of products) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        throw new Error(`Product with ID ${item.product._id} not found`);
      }

      product.sold += item.quantity;
      product.quantity -= item.quantity;

      if (product.quantity < 0) {
        throw new Error(`Not enough stock for product with ID ${item.product._id}`);
      }

      await product.save();
    }




   

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

  // Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}






const getAllOrder = async(req,res)=>{
  try {

    const userId = req.user.id

    if(!userId){
      return res.status(401).json({
        success: false,
        message: `User is not Found`,
      })
    }
    
    const orders = await Order.find({ user: userId })
    .populate({
        path: 'orderItems.product',
        model: 'Product',
    })
    .exec();

console.log('Populated Orders:', orders);

    return res.status(200).json({
      orders,
success: true,
message: `Fetch Orders Successfully`,
})

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error During fetch order`,
    })
  }
}



module.exports = {
    capturePayment,
  paymentVerification,
  createOrder,
  getAllOrder
};
