import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative flex flex-col items-center justify-center bg-primary text-white">
      <div className="w-full mx-0 p-12 bg-black flex flex-col gap-4 justify-center items-center">
        <div className="flex gap-8 p-4 justify-center items-center">
          <p className="text-sm">Follow Us</p>
          <div className="flex gap-6 text-xl">
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="border-[1px] w-[50%] border-primary"></div>
        <p className="text-sm">Copyright © {currentYear} • BAES</p>
      </div>
    </footer>
  );
};

export default Footer;
