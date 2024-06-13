import React, { useEffect } from "react";
import { displayMoney } from "../../../helper/utills";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function TestSlide({ products }) {
  useEffect(() => {
    AOS.init({ duraction: 100000,  });
  }, []);

  // const displayedProducts =  products.slice(0, 5);
  const displayedProducts = [...products].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  ).slice(0, 5);

  return (
    <div
      className="w-full overflow-x-auto  mt-6 "
      style={{
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        "-ms-overflow-style": "none",
      }}
    >
      <div className="flex lg:justify-center flex-nowrap justify-start px-6 ">
        {displayedProducts.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="w-64 mx-2 flex flex-col "
          >
            <div
              className="h-full w-36 overflow-hidden relative lg:w-60 md:w-60"
              data-aos="fade-right"
            >
              <div>
                <img
                  src={product?.images[0]?.url}
                  alt=""
                  className="object-cover h-full w-full transition duration-500 ease-in-out transform hover:-translate-y-1 "
                />
                <img
                  src={product?.images[1]?.url}
                  alt=""
                  className="object-cover h-full w-full absolute top-0 left-0 opacity-0 transition duration-500 ease-in-out transform hover:opacity-100 hover:scale-105"
                />
              </div>

              <div></div>
            </div>
            <div className=" ">
              <p className="font-montserrat text-[15px] text-gray-700 font-semibold">
                {product.title}
              </p>
              <p className="font-montserrat text-[14px] text-gray-600 ">
                {" "}
                {displayMoney(product?.price)}
              </p>
            
            </div>
          </Link>
        ))}
      </div>

      <div className="w-screen flex justify-center mt-6 items-center"></div>
    </div>
  );
}

export default TestSlide;
