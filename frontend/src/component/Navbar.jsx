import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import countries from "./countries";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sport",
    "technology",
  ];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const toggleTheme = () => {
    if (theme == "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

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
          >
            Country
          </Link>
          <ul
            className={
              showCountryDropdown
                ? "dropdown p-2 show-dropdown"
                : "dropdown p-2"
            }
          >
            {countries.map((ele, idx) => {
              <li
                key={idx}
                onClick={() => {
                  setShowCountryDropdown(!showCountryDropdown);
                }}
              >
                <Link
                  to={"/country/" + ele?.iso_2_alpha}
                  className="flex gap-3"
                  type="btn"
                  onClick={() => {
                    setActive(!active);
                  }}
                >
                  <img
                    src={ele?.png}
                    srcSet={`https://flagcdn.com/32x24/${ele?.iso_2_alpha}.png 2x`}
                    alt={ele?.countryName}
                  />
                  <span>{ele?.countryName}</span>
                </Link>
              </li>;
            })}
          </ul>
        </li>
        <li className="dropdown-li">
          <Link
            className="no-underline font-semibold flex items-center gap-2"
            onClick={() => {
              setShowCategoryDropdown(!showCategoryDropdown);
            }}
            Top
            Headlines
          ></Link>
          <ul
            className={
              showCategoryDropdown
                ? "dropdown p-2 show-dropdown"
                : "dropdown p-2"
            }
          >
            {categories.map((ele, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                  }}
                >
                  <Link
                    to={"/top-headlines/" + ele}
                    className="flex gap-3 capitalize"
                    type="btn"
                    onClick={() => {
                      setActive(!active);
                    }}
                  >
                    {ele}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>

        <li>
          <Link
            className="no-underline font-semibold"
            to="#"
            onClick={toggleTheme}
          >
            <input type="checkbox" className="checkbox" id="checkbox" />
            <label for="checkbox" class="checkbox-label">
              <i className="fas fa-moon"></i>
              <i className="fas fa-sun"></i>
              <span className="ball"></span>
            </label>
          </Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Navbar;
