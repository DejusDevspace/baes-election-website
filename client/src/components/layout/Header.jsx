import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoExitOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { student, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full p-4 z-20">
      <div className="container mx-auto flex justify-between items-center px-6 xl:px-4">
        <a href="/">
          <img src="/assets/logo.png" alt="logo" className="max-h-[80px]" />
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
        <div className="lg:hidden">
          <div className="relative">
            <CiMenuFries
              className="text-[32px] cursor-pointer"
              onClick={toggleMenu}
            />

            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-4 bg-secondary/80 text-primary rounded-lg shadow-lg 
            py-4 px-6 flex flex-col flex-grow gap-4 z-100"
                >
                  <li>
                    <a href="/">Home</a>
                  </li>
                  {student ? (
                    <div className="flex flex-col w-full gap-4">
                      <li>
                        <a href="/vote">Vote</a>
                      </li>
                      <li
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={logout}
                      >
                        <span>Logout</span>
                        <IoExitOutline className="text-2xl text-red-800" />
                      </li>
                    </div>
                  ) : (
                    <li>
                      <a href="/login">Login</a>
                    </li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
