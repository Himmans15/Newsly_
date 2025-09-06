import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
      <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-2 mt-5">
        <span className="logo">
          <img src={logo} alt="Newly" />
        </span>
      </h3>
      <ul
        className={
          active
            ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active"
            : " nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"
        }
      >
        <li>
          <Link
            className="no-underline font-semibold"
            to="/"
            onClick={() => setActive(!active)}
          >
            All News
          </Link>
        </li>
        <li className="dropdown-li">
          <Link
            className="no-underline font-semibold flex items-center gap-2"
            onClick={() => {
              setShowCountryDropdown(!showCountryDropdown);
            }}
          ></Link>
        </li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Navbar;
