import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo/logo1.png";
import { useAuth } from "../utilis/AuthProvider";
import authAPI from "../api/auth/authAPI";
import UserDropDown from "./UserDropodown";
import { Typography } from "@mui/material";


const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const { user, logout, isAuthenticate } = useAuth();
  const location = useLocation();

  const navigate = useNavigate()


  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  });


  const from = location.state?.from.pasthname || "/";


  const logoutHandle = async () => {
    await authAPI.logout()
    logout()
    navigate(from, { replace: true })
  }

  return (
    <header
      className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""
        }`}
    >
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <Link to="/signup" className="lab-btn me-3"> <span>Create Account</span> </Link>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            {/* logo */}
            <div className="logo-search-acte">
              <div className="logo">
                <Link className="d-flex align-items-center">
                  <img src={logo} alt="" width={"100px"} height={"100px"} />
                  <Typography variant="h6">VINTAGE WATCH</Typography>
                </Link>
              </div>
            </div>

            {/* Menu area */}
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to="/ ">Home</Link>
                  </li>
                  <li>
                    <Link to="/shop ">Buy</Link>
                  </li>
                  <li>
                    <Link to="/evaluation ">Sell</Link>
                  </li>
                  {/* <li>
                    <Link to="/blog ">Blog</Link>
                  </li>
                  <li>
                    <Link to="/about ">About</Link>
                  </li> */}
                  <li>
                    <Link to="/contact ">Contact</Link>
                  </li>
                </ul>
              </div>

              {/* sign in, login*/}
              {/* <a href="/cart-page"><CartBadge /></a> */}
              {isAuthenticate ?
                <UserDropDown user={user} logoutHandle={logoutHandle} />
                :
                <>
                  <Link to="/sign-up" className="lab-btn me-3 d-none d-md-block">
                    Create Account
                  </Link>
                  <Link to="/login" className="d-none d-md-block">
                    Log in
                  </Link>
                </>
              }

              {/*menu toggler*/}
              <div
                onClick={() => setMenuToggle(!menuToggle)}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              {/* social toggler*/}
              <div className="ellepsis-bar d-md-none"
                onClick={() => setSocialToggle(!socialToggle)}>
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavItems;
