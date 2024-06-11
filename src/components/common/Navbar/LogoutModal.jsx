import React from "react";

function LogoutModal({ onClose, onConfirmLogout }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <p className="text-lg mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              onConfirmLogout();
              onClose(); // Close the modal after confirming logout
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Yes
          </button>
          <button
            onClick={() => onClose()} // Close the modal without logging out
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
