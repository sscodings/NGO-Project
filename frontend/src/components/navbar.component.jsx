import { useState } from "react";
import logo from "../imgs/logo.png";
import { Link, Outlet } from "react-router-dom";
import UserNavigationPanel from "./user-navigation.component";

const Navbar = () => {

  const [userNavPanel, setUserNavPanel] = useState(false);

  const handleUserNavPanel = () => {
    setUserNavPanel((val) => !val);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  return (
    <>
      <nav className="w-full bg-white border-b flex items-center px-8 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">

          <div className="bg-blue-600 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg">
            ❤
          </div>

          <h1 className="font-semibold text-lg">
            Seva<span className="text-blue-600">Connect</span>
          </h1>

        </Link>

        {/* Center Links */}
        <div className="flex gap-10 mx-auto text-gray-600 font-medium">

          <Link to="/volunteer" className="hover:text-black">
            Volunteer
          </Link>

          <Link to="/donate" className="hover:text-black">
            Donate
          </Link>

          <Link to="/about" className="hover:text-black">
            About Us
          </Link>

        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">

          {/* Test Buttons */}
          <Link 
            to="/user-dashboard" 
            className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all"
          >
            Test User
          </Link>

          <Link 
            to="/ngo-dashboard" 
            className="border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all"
          >
            Test NGO
          </Link>

          <Link to="/signin" className="text-gray-700 font-medium ml-4">
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-black text-white px-6 py-3 rounded-full font-medium"
          >
            Join Us
          </Link>

          {/* Profile */}
          <div
            className="relative"
            onClick={handleUserNavPanel}
            onBlur={handleBlur}
          >
            <button className="w-10 h-10 rounded-full bg-gray-300"></button>

            {userNavPanel && <UserNavigationPanel />}

          </div>

        </div>

      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;