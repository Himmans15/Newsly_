import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import countries from "./countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light");

  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    "politics",
  ];

  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-800 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold">Newsly</h1>
        </Link>

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
          <li className="relative group">
            <button
              onClick={() => {
                setShowCategoryDropdown((prev) => !prev);
                setShowCountryDropdown(false);
              }}
              className="flex items-center gap-1 px-4 py-2 font-medium hover:text-blue-400"
            >
              Top-Headlines{" "}
              <FontAwesomeIcon icon={faCircleArrowDown} className="text-sm" />
            </button>
            {showCategoryDropdown && (
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/top-headlines/${cat}`}
                      className="block px-4 py-2 hover:bg-gray-100 capitalize"
                      onClick={() => {
                        setMenuOpen(false);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Country Dropdown */}
          <li className="relative group">
            <button
              onClick={() => {
                setShowCountryDropdown((prev) => !prev);
                setShowCategoryDropdown(false);
              }}
              className="flex items-center gap-1 px-4 py-2 font-medium hover:text-blue-400"
            >
              Country{" "}
              <FontAwesomeIcon icon={faCircleArrowDown} sclassName="text-sm" />
            </button>
            {showCountryDropdown && (
              <ul className="absolute overflow-auto max-h-85 left-0 mt-2 w-56 bg-white text-black rounded shadow-lg z-50">
                {countries.map((country, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/country/${country.iso_2_alpha}`}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 capitalize"
                      onClick={() => {
                        setMenuOpen(false);
                        setShowCountryDropdown(false);
                      }}
                    >
                      <img
                        src={`https://flagcdn.com/w40/${country.iso_2_alpha.toLowerCase()}.png`}
                        alt={country.countryName}
                        className="w-5 h-4 object-cover"
                      />
                      <span>{country.countryName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Theme Toggle */}
          <li className="px-4 py-2">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                    theme === "dark" ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-sm">
                {theme === "dark" ? "Dark" : "Light"} Mode
              </span>
            </label>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
