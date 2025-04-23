import React from "react";
import baesLogo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="w-full p-4 z-20">
      <div className="container mx-auto flex justify-between items-center px-6 xl:px-4">
        <a href="/">
          <img src={baesLogo} alt="logo" className="max-h-[80px]" />
        </a>
        <div className="hidden lg:flex p-4">
          <nav className="flex space-x-4 list-none">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">Log In</a>
            </li>
            <li>
              <a href="/vote">Vote</a>
            </li>
          </nav>
        </div>
        <div className="lg:hidden">Mobile Nav</div>
      </div>
    </header>
  );
};

export default Header;
