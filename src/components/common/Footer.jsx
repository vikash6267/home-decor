import React from 'react';
import { FaFacebookF,FaWhatsapp,FaInstagram   } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="relative bg-blue-200 pt-8 pb-6 mt-[100px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-blue-700">N.K Enterprises</h4>
            <h5 className="text-lg mt-0 mb-2 text-blue-600">
            Delivery within 4-7 working days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex">
         
              <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
              <FaFacebookF />
              </button>
              <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
              <FaWhatsapp />
              </button>
              <button className="bg-white text-blue-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
              <FaInstagram />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto justify-center flex flex-col ">
                <span className="block uppercase text-blue-500 text-sm font-semibold mb-2">Useful Links</span>
                <ul className="list-unstyled">
                 
                  <li>
                    <a href="https://home-decore.vercel.app/profile" className="text-blue-600 hover:text-blue-800 font-semibold block pb-2 text-sm">My Profile</a>
                  </li>
                  <li>
                    <a href="https://home-decore.vercel.app/order" className="text-blue-600 hover:text-blue-800 font-semibold block pb-2 text-sm">My Order</a>
                  </li>
                  <li>
                    <a href="https://home-decore.vercel.app/contact" className="text-blue-600 hover:text-blue-800 font-semibold block pb-2 text-sm">Contact Us</a>
                  </li>
                  <li>
                    <Link to="/admin/dashboard/add-product" className="text-blue-600 hover:text-blue-800 font-semibold block pb-2 text-sm">Admin Route</Link>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blue-500 text-sm font-semibold mb-2">About Us</span>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold block pb-2 text-sm">N. K ENTERPRISES Jodhpur Road Pipar City Dist.Jodhpur 342601</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold block pb-2 text-sm">9166869829</a>
                  </li>
                
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blue-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blue-500 font-semibold py-1 flex gap-2">
              Copyright © <span id="get-current-year">2021</span>

<div className=''>
Powered By -
<a href="https://mahi-technocrafts.vercel.app/" className="text-blue-500 hover:text-gray-800" target="_blank" rel="noopener noreferrer"> I-NEXT-ETS</a>
</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
