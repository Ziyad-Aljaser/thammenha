import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import logo from "../../assets/small-logo.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  // Used to handle the logout
  const handleLogout = async () => {
    try {
      await logout();
      // Optionally, redirect user to homepage or show a notification
      console.log("Successfully Logged Out!");
    } catch (error) {
      console.error("Failed to logout: ", error);
    }
  };

  // Used for the light/dark mode
  // use theme from local storage if available or set light theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "ar"
  );

  // Sync i18n's current language with the component state
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleLanguageToggle = (selectedLanguage) => {
    if (selectedLanguage !== language) {
      setLanguage(selectedLanguage);
      i18n.changeLanguage(selectedLanguage); // Update i18n language
    }
  };

  useEffect(() => {
    localStorage.setItem("language", language);
    document
      .querySelector("html")
      .setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  }, [language]);

  return (
    <div className="sticky top-0 z-[1] bg-base-200 py-2">
      <div className="max-w-7xl mx-auto navbar">
        {/* Small Screen Menu-Logo Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {currentUser && (
                <>
                  <li className="menu-title">
                    <span className="text-yellow-500">
                      Welcome, {currentUser.displayName}!
                    </span>
                  </li>
                  <div className="divider"></div>
                </>
              )}
              <li>
                <Link to="/estimation">{t("navbar.Estimator")}</Link>
              </li>
              <li>
                <Link to="/reports">{t("navbar.Reports")}</Link>
              </li>
              <div className="divider"></div> {/* Styled as a divider */}
              {currentUser ? (
                <>
                  {/* Adjust CSS for -mt-0.5 effect if needed */}
                  <li className="negative-margin">
                    {/* Use class to adjust margins */}
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-3xl"
            style={{ fontFamily: "'El Messiri', sans-serif", direction: "rtl" }}
          >
            {t("navbar.title")} {/* Use the translation key */}
            <div className="w-16 rounded-full">
              <img src={logo} alt="Logo" />
            </div>
          </Link>
        </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              <li
                className="text-xl"
                style={{
                  fontFamily: "'El Messiri', sans-serif",
                  direction: "rtl",
                }}
              >
                <Link to="/estimation">{t("navbar.Estimator")}</Link>
              </li>
              <li
                className="text-xl"
                style={{
                  fontFamily: "'El Messiri', sans-serif",
                  direction: "rtl",
                }}
              >
                <Link to="/reports">{t("navbar.Reports")}</Link>
              </li>
            </ul>
          </div>

        {/* User Section - Visible only on lg screens */}
        <div className="flex justify-end flex-1 px-2 hidden lg:flex">
          {/* User Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <path d="M16 7 A4 4 0 0 1 12 11 A4 4 0 0 1 8 7 A4 4 0 0 1 16 7 z" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {currentUser ? (
                <>
                  <li className="menu-title">
                    <span className="text-yellow-500">
                      Welcome, {currentUser.displayName}!
                    </span>
                  </li>

                  <div className="divider -mt-0.5"></div>
                  {/* - before mt is for forcing the button to go up */}
                  <li className="-mt-5">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Light/Dark Mode Section */}
        <div className="lg:px-2 flex justify-end flex-1 px-2 lg:flex-none lg:justify-start">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                onChange={handleToggle}
                // show toggle image based on localstorage theme
                checked={theme === "light" ? false : true}
              />
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              {/* sun icon */}
              <svg
                className="swap-on fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </label>
        </div>

        {/* Language Toggle Dropdown */}
        <div title="Change Language" className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex items-center gap-1"
            aria-label="Language"
            style={{
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M11 5a.75.75 0 0 1 .688.452l3.25 7.5a.75.75 0 1 1-1.376.596L12.89 12H9.109l-.67 1.548a.75.75 0 1 1-1.377-.596l3.25-7.5A.75.75 0 0 1 11 5Zm-1.24 5.5h2.48L11 7.636 9.76 10.5ZM5 1a.75.75 0 0 1 .75.75v1.261a25.27 25.27 0 0 1 2.598.211.75.75 0 1 1-.2 1.487c-.22-.03-.44-.056-.662-.08A12.939 12.939 0 0 1 5.92 8.058c.237.304.488.595.752.873a.75.75 0 0 1-1.086 1.035A13.075 13.075 0 0 1 5 9.307a13.068 13.068 0 0 1-2.841 2.546.75.75 0 0 1-.827-1.252A11.566 11.566 0 0 0 4.08 8.057a12.991 12.991 0 0 1-.554-.938.75.75 0 1 1 1.323-.707c.049.09.099.181.15.271.388-.68.708-1.405.952-2.164a23.941 23.941 0 0 0-4.1.19.75.75 0 0 1-.2-1.487c.853-.114 1.72-.185 2.598-.211V1.75A.75.75 0 0 1 5 1Z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              width="12px"
              height="12px"
              className="fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5"
          >
            <ul className="menu menu-sm gap-1">
              <li>
                <button
                  className={`flex ${language === "ar" ? "active" : ""}`} // Indicate active language
                  onClick={() => handleLanguageToggle("ar")}
                >
                  <span className="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50">
                    AR
                  </span>
                  <span className="font-[sans-serif]">عربي</span>
                </button>
              </li>
              <li>
                <button
                  className={`flex ${language === "en" ? "active" : ""}`} // Indicate active language
                  onClick={() => handleLanguageToggle("en")}
                >
                  <span className="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50">
                    EN
                  </span>
                  <span className="font-[sans-serif]">English</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
