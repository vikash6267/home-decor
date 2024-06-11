import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayMoney } from "../helper/utills";
import { Link } from 'react-router-dom';
import { CiSliderHorizontal } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";

import { IoCheckmarkCircleSharp } from "react-icons/io5";
import AOS from "aos";
import 'aos/dist/aos.css'


// Exporting available sizes and genders
export const sizes = ["S", "M", "L", "XL", "XXL"];
export const genders = ["Male", "Female", "Unisex"];



function AllProduct({ products }) {
  const { query } = useParams();




  const { allProduct } = useSelector(state => state.product);







  useEffect(()=>{
    AOS.init({duraction:5000})
  
 
  },[])




  return (
    <div className="min-h-screen  mt-[54px] min-w-[100vw] mx-auto mb-[100px] ">
      <div className='min-h-full '>
        <div className="flex ">
    
          {/* Product Listing */}
          <div className=" w-full bg-white p-4 min-h-screen">
            {/* Product view options */}
          

           

            {/* Product listing */}
          {
            allProduct.length === 0 ? <div className=' flex items-center h-[70vh] justify-center font-bold '>
              Not product are found 
            </div>: 

            <div className={`grid lg:grid-cols-4 lg:px-6 gap-2 sm:grid-cols-2 md:grid-cols-3 grid-cols-2`} >
              {allProduct.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  data-aos="zoom-in-down"
                >
                  <div className='flex flex-col gap-3 mt-2'>
                    <div className='h-full min-w-[10rem] overflow-hidden relative'>
                      <img src={product.images[0].url} alt='' className='object-cover h-full w transition duration-500 ease-in-out transform hover:-translate-y-1' />
                      <img src={product.images[1].url} alt='' className='object-cover h-full w absolute top-0 left-0 opacity-0 transition duration-500 ease-in-out transform hover:opacity-100' />
                    </div>
                    <div>
                      <p className='font-montserrat lg:text-lg text-gray-600'>{product.title}</p>
                      <p className='font-montserrat lg:text-sm text-gray-600'> {displayMoney(product.price)}</p>
                   
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
