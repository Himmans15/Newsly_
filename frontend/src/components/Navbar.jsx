import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-gray-800 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Newsly</h1>

        {/* Hamburger - Mobile screen version  */}
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="space-y-1 cursor-pointer">
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
          </div>
        </div>

        {/* Nav Links */}
        <ul
          className={`md:flex md:items-center md:space-x-8 absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden md:block"
          }`}
        >
          <li>
            <Link
              to="/"
              className="block px-4 py-2 hover:text-blue-400 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              All News
            </Link>
          </li>

          {/* Category Dropdown */}
          <li className="relative group"></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
