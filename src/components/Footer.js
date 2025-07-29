import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="text-gray-400 hover:text-white">
          Privacy Policy
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          Terms of Service
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
