import { toast } from "react-hot-toast"

// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector"
import { productEndpoints } from "../apis"
import { saveProduct } from "../../redux/slices/product"
import { allWishlist } from "../../redux/slices/wishListSlice"

const {
    GET_ALL_PRODUCT_API,
    GET_PRODUCT_DETAILS,
    ADD_TO_WISHLIST,
    REMOVE_TO_WISHLIST,
    GET_WISHLIST,

    GET_COUPON
} =productEndpoints

export const getAllProduct = () => async (dispatch) => {
   ;
  try {
    const response = await apiConnector("GET", GET_ALL_PRODUCT_API);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Product");
    }
    const result = response?.data?.data;
    dispatch(saveProduct(result)); // Dispatching action to save products
     ;
    return result;
  } catch (error) {
    console.log("GET_ALL_PRODUCT_API API ERROR:", error);
    toast.error(error.message);
     ;
    return [];
  }
};

  
export const fetchProductDetails = async (productID) => {
  //  

  let result = null
  try {
    const response = await apiConnector("POST", GET_PRODUCT_DETAILS, {
      productID,
    })
    console.log("GET_PRODUCT_DETAILS API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("GET_PRODUCT_DETAILS API ERROR............", error)
    result = error.response.data
    toast.error(error.response.data.message);
  }
  //  
  //   dispatch(setLoading(false));
  return result
}




// WISHLIST 

export const addToWish = async (productId,token,dispatch) =>{
  const toastId = toast.loading("Adding Wishlist...")
   
let result = null
  try {
    const response = await apiConnector("POST", ADD_TO_WISHLIST, {
      productId
    },
    {
      Authorization: `Bearer ${token}`,
    })
    console.log("WISHLIST_DETAILS API RESPONSE............", response)

     result = response?.data?.wishlist
  toast.success("Product Added In WishLIst")
  fetchWishlist(token,dispatch)

  } catch (error) {
    console.log("WISHLIST API ERROR............", error)
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
   
  return result

}


export const removeFromWish = async (productId,token,dispatch) =>{
   const toastId = toast.loading("Removing Wishlist...")

  try {
    const response = await apiConnector("DELETE", REMOVE_TO_WISHLIST, {
      productId
    },
    {
      Authorization: `Bearer ${token}`,
    })
    console.log("WISHLIST_DETAILS REMOVE API RESPONSE............", response)

  toast.success("Product Remove In WishLIst")
  fetchWishlist(token,dispatch)
  } catch (error) {
    console.log("WISHLIST API ERROR............", error)
    toast.error(error.response?.data?.message);
  }
   toast.dismiss(toastId)

}



  
export const fetchWishlist = async (token,dispatch) => {
   

  let result = null
  try {
    const response = await apiConnector("GET", GET_WISHLIST, null,  {
      Authorization: `Bearer ${token}`,
    } )
    // console.log("GET_WISHLIST_DETAILS API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }
    result = response?.data

   console.log(response?.data?.wishlist)
    dispatch(allWishlist(response?.data?.wishlist))
  } catch (error) {
    console.log("GET_WISHLIST_DETAILS API ERROR............", error)
    result = error?.response?.data
    toast.error(error?.response?.data?.message);
  }
   
  //   dispatch(setLoading(false));
  return result
}




//COUPON 
  
export const fetchCoupon = async (name,token) => {
   
  console.log(name)

  let result = null
  try {
    const response = await apiConnector("POST", GET_COUPON, {name} )
    // console.log("GET_COUPON API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("GET_COUPON API ERROR............", error)
    result = error.response.data
    toast.error(error.response.data.message);
  }
   
  //   dispatch(setLoading(false));
  return result
}

