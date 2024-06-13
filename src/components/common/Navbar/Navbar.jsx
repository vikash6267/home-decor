import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Backdrop from "../../common/Backdrop";
import { FaSun, FaCloudSun, FaMoon, FaAngleDoubleDown } from "react-icons/fa";
import { NavbarLinks } from "../../../constant/NavbarData";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { logout } from "../../../serivces/operations/user";
import LogoutModal from "./LogoutModal";

function getGreeting() {
  const currentHour = new Date().getHours();
  let greeting = "";
  let icon = null;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
    icon = <FaSun className="text-yellow-500" />;
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
    icon = <FaCloudSun className="text-yellow-400" />;
  } else {
    greeting = "Good Evening";
    icon = <FaMoon className="text-blue-500" />;
  }

  return { greeting, icon };
}

function Navbar({ isOpen, setIsOpen }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const ref = useRef(null);
  useOnClickOutside(ref, () => dispatch(setIsOpen(false)));
  const { user } = useSelector((state) => state.profile);

  const logoutHandler = () => {
    console.log("Working Logout");
    dispatch(logout(navigate));
  };
  const { greeting, icon } = getGreeting();

  const handleClose = () => {
    console.log("Backdrop clicked, closing navbar");
    dispatch(setIsOpen(false));
  };

  useEffect(() => {
    console.log(isOpen);
    AOS.init({ duration: 800, once: true });
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 z-40 overflow-scroll uppercase `}
        >
          <Backdrop onClick={handleClose} />
          <motion.div
            id="navbar"
            ref={ref}
            className="fixed top-0 left-0 bottom-0 lg:w-[350px] w-[300px] bg-white p-6 z-40 border-r-2 shadow-lg"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="w-11/12 mx-auto mt-6">
              <div className="flex flex-col items-center text-lg gap-4">
                <div className="flex flex-col items-center">
                  <img
                    src={user?.image}
                    alt=""
                    width={60}
                    className="rounded-full"
                    data-aos="fade-up"
                  />
                  <div className="flex items-center mt-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="mr-2">{icon}</div>
                    <div className="text-lg font-semibold">{greeting}</div>
                  </div>
                  {user && (
                    <div className="mt-2 text-lg text-gray-700" data-aos="fade-up" data-aos-delay="200">{user.name}</div>
                  )}
                </div>
                

<div className="flex flex-col w-full mt-8 gap-4">
  {user ? (
    <>
      <Link
        to="profile"
        onClick={() => dispatch(setIsOpen(false))}
        className="font-semibold flex items-center gap-2 hover:text-blue-600"
        data-aos="fade-up" data-aos-delay="100"
      >
        My Profile
        <FaAngleDoubleDown className=" -rotate-45 text-blue-500" />
      </Link>
{
  user?.accountType === "Admin" &&
  <Link
        to="admin/dashboard/orders"
        onClick={() => dispatch(setIsOpen(false))}
        className="font-semibold flex items-center gap-2 hover:text-blue-600"
        data-aos="fade-up" data-aos-delay="100"
      >
       Dashboard
        <FaAngleDoubleDown className=" -rotate-45 text-blue-500" />
      </Link>
}
      

      <button
        onClick={() => {
          setShowLogoutModal(true);
          dispatch(setIsOpen(false));
        }}
        className="text-red-500 hover:text-red-700"
        data-aos="fade-up" data-aos-delay="150"
      >
        Logout
      </button>
    </>
  ) : (
    <Link
      to="/login"
      className="font-semibold hover:text-blue-600"
      onClick={() => dispatch(setIsOpen(false))}
      data-aos="fade-up" data-aos-delay="100"
    >
      Login
    </Link>
  )}
</div>
<ul className="flex flex-col w-full  gap-3   ">
  {NavbarLinks.map((link, index) => (
    <Link
      key={index}
      to={link.path}
      className=" transition-colors duration-300 hover:text-blue-600 border-b-2 border-gray-300 text-lg py-1"
      onClick={() => dispatch(setIsOpen(false))}
      data-aos="fade-up"
      data-aos-delay={`${200 + index * 50}`}
    >
      <p >{link.title}</p>
    </Link>
  ))}
</ul>

              </div>
            </div>
          </motion.div>
        </div>
      )}
      <div>
        {showLogoutModal && (
          <LogoutModal
            onClose={() => setShowLogoutModal(false)}
            onConfirmLogout={logoutHandler}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </AnimatePresence>
  );
}

export default Navbar;
