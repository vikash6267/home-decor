import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { displayMoney } from "../../../helper/utills";
import "./ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

function ProductCard({ products }) {

  useEffect(() => {
    AOS.init({ duraction: 2000, once: true });
  }, []);
  const { _id, title, description, price, highPrice, images } = products;
  const truncatedDescription =
    description.length > 25
      ? description.substring(0, 25) + "..."
      : description;

  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleAddToCart = (products) => {
    dispatch(addToCart({ products }));
  };

  const newPrice = displayMoney(price);
  const oldPrice = displayMoney(highPrice);
  return (
    <div className=" font-montserrat flex flex-col gap-0  " data-aos="zoom-in">
      <figure className=" ">
        <Link
          to={`/product/${_id}`}
          className="flex  justify-center items-center"
        >
          <div className="flex justify-center items-center">
            <div className="relative flex justify-center items-center">
              <img
                src={images[0]?.url}
                alt={title}
                className=" transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              />
              <img
                src={images[1]?.url}
                alt={title}
                className=" absolute top-0 left-0 opacity-0 transition duration-1000 ease-in-out transform hover:opacity-100"
              />
            </div>
          </div>
        </Link>
      </figure>

      <div className=" -mt-3">
        {/* <span className="rating_star">
          {[...Array(totalrating)].map((_, i) => (
            <IoMdStar key={i} />
          ))}
        
        </span> */}
        <h3 className="products_title">
          <Link
            to={`/product/${_id}`}
            className=" text-gray-700 lg:text-[13px] text-[12px] "
          >
            {title}
          </Link>
        </h3>
        {/* <h5 className="products_info text-base w-full">{truncatedDescription}</h5> */}

        {/* <div className=" ">
        
          <ul className="flex  gap-3 mt-3 font-bold text-sm">
            {sizes.map((size, index) => (
              <li key={index}>{size}</li>
            ))}
          </ul>
        </div> */}
        {/* <div className="w-0 bg-white  transition-all origin-left"></div> */}

        {/* <div className="my-4 border-t border-gray-600"></div> */}

        <h2 className="  flex text-[12px] lg:text-[13px] -mt-5 lg:-mt-2  sm:text-xl md:text-xl xs:text-sm justify-between">
          {newPrice} &nbsp;
          <small>
            <del className=" text-red-600">{oldPrice}</del>
          </small>
        </h2>

        {/* <div className="mt-4 flex justify-center w-full text-base lg:text-xl  sm:text-xl md:text-xl xs:text-sm">
  {cart.some((item) => item.product._id === _id) ? (
    <Link
      to="/cart"
      className="bg-gray-200 text-gray-700  px-4 rounded-xl hover:bg-gray-300 hover:text-gray-800 transition duration-300 text-sm lg:text-xl  sm:text-xl md:text-xl xs:text-sm"
    >
      Go to Cart
    </Link>
  ) : (
    <button
      onClick={() => handleAddToCart(products)}
      className="bg-gradient-to-r from-green-400 to-green-500 text-white py-2 px-4 rounded-xl hover:from-green-500 hover:to-green-600 flex items-center gap-2 transition duration-300 text-sm lg:text-xl  sm:text-xl md:text-xl xs:text-sm"
    >
      <span>Add To Cart</span>
      <MdOutlineShoppingCartCheckout className="text-xl" />
    </button>
  )}
</div> */}
      </div>
    </div>
  );
}

export default ProductCard;
