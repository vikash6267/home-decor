
import './App.css';
// Library
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// Secuirty
import OpenRoute from './routes/OpenRoute';
import PrivateRoute from './routes/PrivateRoute';
//Component
import Header from "./components/common/Navbar/Header"

//component
import Modal from './components/core/cart/Modal';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';
import AllProduct from './pages/AllProduct';
import CheckoutForm from './components/core/cart/CheckoutForm';
import Order from './pages/MyOrder';



//API
import { getAllProduct } from "./serivces/operations/product";
import { useEffect } from 'react';
import { setCheckout } from "./redux/slices/paymentSlice";
 


function App() {
  const { checkout } = useSelector((state) => state.payment);
  const { token } = useSelector((state) => state.auth);

const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllProduct())
  },[])
  return (
    <div className="min-w-screen min-h-screen flex flex-col font-montserrat">
<Header />


<Routes >

<Route path="/" element={<Home />} />
{/* <Route path="/allProduct" element={<AllProduct />} /> */}
<Route path="product/:productID" element={<ProductDetails />} />



<Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
    <Route
          path="order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />

        
<Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
</Routes>



{checkout && (
  <PrivateRoute>
      
          <Modal
            show={checkout}
            handleClose={() => dispatch(setCheckout(false))}
          >
            <CheckoutForm  handleClose={() => dispatch(setCheckout(false))} />
          </Modal>
          </PrivateRoute>

        
      )}


    </div>
  );
}

export default App;
