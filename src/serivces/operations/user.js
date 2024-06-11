import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { userEndpoints } from "../apis"
import { resetWishlist } from "../../slices/wishListSlice"
const {
  SEND_OTP_API,
  VERIFY_OTP_API,
  SIGNUP_API,
  LOGIN_API,
  ADD_ADDRESS,
  FETCH_PROFILE,
  REFER_CODE
} = userEndpoints



export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    let result = []

    try {
      const response = await apiConnector("POST", SEND_OTP_API, {
        email
      })
      // console.log("SENDOTP API RESPONSE............", response)

      // console.log(response.data.success)
      result = response.data.success
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      // navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
      return result
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result

  }
}



export function compareOtp(otp, email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    let result = []
    try {
      const response = await apiConnector("POST", VERIFY_OTP_API, {
        otp, email
      })
      console.log("Compare API RESPONSE............", response)


      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      if (response.data.userFind) {
        console.log(response.data.token)
        dispatch(setToken(response.data.token))
        dispatch(setUser(response.data.existingUser))
        localStorage.setItem("user", JSON.stringify(response.data.existingUser))

        localStorage.setItem("token", JSON.stringify(response.data.token))
        navigate("/profile")


      }
      result = response?.data?.userFind

      toast.success("Login Succesfully")
      // navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  formData,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, formData)

      // console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      console.log(response.data.user)
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      localStorage.setItem("user", JSON.stringify(response.data.user))

      localStorage.setItem("token", JSON.stringify(response.data.token))
      navigate("/profile")


      toast.success("Login Successful")

    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Login Failed")
      navigate("/login")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}



export function fetchMyProfile(token) {

  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", FETCH_PROFILE, null, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      })

      console.log("APP JS RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      // console.log(response.data)

      dispatch(setUser(response.data.user))



      localStorage.setItem("user", JSON.stringify(response.data.user))

    } catch (error) {
      // console.log("LOGIN API ERROR............", error)
    }
    dispatch(setLoading(false))
  }
}

// Address

export function addAddress(
  formData,
  token
) {
  console.log(token)
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", ADD_ADDRESS, formData, {
        Authorization: `Bearer ${token}`,
      })

      console.log("ADD ADRESS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      console.log(response.data)

      const existingUser = JSON.parse(localStorage.getItem("user")) || {};

      const newAddress = response.data.address;
      let updatedAddresses;

      if (newAddress.isDefault) {
        // Set all existing addresses to isDefault: false
        updatedAddresses = existingUser.addresses.map(address => ({ ...address, isDefault: false }));
      } else {
        // Keep existing addresses as they are
        updatedAddresses = [...existingUser.addresses];
      }

      // Add the new address
      updatedAddresses.push(newAddress);

      const updatedUser = {
        ...existingUser,
        addresses: updatedAddresses
      };


      console.log(updatedUser)

      dispatch(setUser(updatedUser))

      localStorage.setItem("user", JSON.stringify(updatedUser))

      toast.success("Address Successful")

    } catch (error) {
      console.log("Address API ERROR............", error)
      toast.error("Address Add Failed")
      // navigate("/login")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export async function referCodeKnow(refer) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("POST", REFER_CODE, { refer });


    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // console.log(response.user);

    result = response.data.user;
    // navigate("/verify-email") // Assuming you want to navigate somewhere after success
  } catch (error) {
    console.log("REFER API ERROR:", error);
  }

  toast.dismiss(toastId);
  return result; // Returning the result of the asynchronous operation
}



export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    dispatch(resetWishlist())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}