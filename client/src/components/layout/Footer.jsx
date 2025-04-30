import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="flex flex-col items-center gap-4 p-6 md:p-12">
        <div className="flex items-center gap-4">
          <p className="text-sm">Follow Us</p>
          <div className="flex gap-4 text-xl">
            <a
              href="https://www.instagram.com/bowen_engr?igsh=MWtqZTU2Y3BxaG45ag=="
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-special hover:scale-105 transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/BAES_engineers"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-special hover:scale-105 transition-all duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/company/bowen-association-of-engineering-students/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-special hover:scale-105 transition-all duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="w-[50%] border-t border-primary" />
        <p className="text-sm text-center">
          © {currentYear} • BAES. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
