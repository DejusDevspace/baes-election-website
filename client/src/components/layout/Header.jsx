import React, { useContext } from "react";
import baesLogo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { student, logout } = useContext(AuthContext);
  console.log("student: ", student);

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
                <li>
                  <button onClick={logout} className="cursor-pointer">
                    Log Out
                  </button>
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
