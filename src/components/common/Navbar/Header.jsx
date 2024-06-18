import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import logo from "../../../assests/logo.png"
import Cart from "../../../pages/Cart";
import { handleIsCartOpen } from "../../../redux/slices/cartSlice";
import Navbar from "./Navbar";
import { handleIsMenuOpen } from "../../../redux/slices/product";

import user from "../../../assests/gif/user.gif"
import cart from "../../../assests/gif/cart.gif"


function Header() {
  const { isMenuOpen } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  return (
    <div className="  ">
      <div className="border-b-2 border-gray-500 fixed w-full z-50 bg-white">
        <div className="w-11/12 mx-auto flex h-[60px] items-center justify-between relative">
          <div className="flex  items-center ">
            <RxHamburgerMenu
              className="text-2xl cursor-pointer"
              onClick={() => dispatch(handleIsMenuOpen())}
            />
            <Navbar isOpen={isMenuOpen} setIsOpen={handleIsMenuOpen} />
          </div>
          <div className=" ">
            <Link to="/">
              <div className="text-xl font-bold tracking-wider text-center flex w-full justify-center ">
                    <img src={logo}    alt=""
                    className=" relative top-0"
                    width={120}/>
              </div>
            </Link>
          </div>
          <div className="flex">
            {/* <SearchBar /> */}
            {/* <div className="min-h-[80%] bg-slate-800 min-w-[1px] mx-3"></div> */}
            <div className="flex items-center ">
            
          

              <Link to="/profile" className="" title="Profile">
                {/* <FaUserAlt /> */}
                <img
                    src={user}
                    alt=""
                    className=""
                    width={30}
                  />
              </Link>
           

           
              <Cart />

              <div
                title="Cart"
                className=" cursor-pointer"
                onClick={() => dispatch(handleIsCartOpen())}
              >
                <div className="text-lg ">
                  {/* <GrShop className="text-lg " /> */}
                  <img
                    src={cart}
                    alt=""
                    className=""
                    width={30}
                  />

                  {/* {totalItems > -1 && (
                  <p className="absolute top-1  z-20 rounded-full text-sm  ">
                    {totalItems}
                  </p>
                )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
