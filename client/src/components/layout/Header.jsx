import React, { useContext } from "react";
import baesLogo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { IoExitOutline } from "react-icons/io5";

const Header = () => {
  const { student, logout } = useContext(AuthContext);

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
            {student ? (
              <div className="flex gap-4">
                <li>
                  <a href="/vote">Vote</a>
                </li>
                <li
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={logout}
                >
                  <span>Log Out</span>
                  <IoExitOutline className="text-2xl text-red-800" />
                </li>
              </div>
            ) : (
              <li>
                <a href="/login">Log In</a>
              </li>
            )}
          </nav>
        </div>
        <div className="lg:hidden">Mobile Nav</div>
      </div>
    </header>
  );
};

export default Header;
