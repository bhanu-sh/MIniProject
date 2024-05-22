import React from "react";
import { Link, NavLink } from "react-router-dom";
import UseAppContext from "../AppContext";
import "../App.css";
import { motion } from "framer-motion";

const Navbar = () => {
  const userJSON = sessionStorage.user;
  const user = userJSON ? JSON.parse(userJSON) : null;

  const { loggedin, logout } = UseAppContext();

  const displayUserOption = () => {
    if (loggedin) {
      return (
        <>
          <div className="row mx-auto">
            <li className="nav-item col my-auto">
              <button className="btn btn-danger w-100" onClick={logout}>
                Logout
              </button>
            </li>
            <li className="nav-item col">
              <Link to={"/profile"}>
                {user.avatar ? (
                  <img
                    src={"https://refurnished.s3.amazonaws.com/" + user.avatar}
                    width={50}
                    className="rounded-circle pfp"
                    alt=""
                  />
                ) : (
                  <img
                    src={process.env.REACT_APP_BACKEND_URL + "/defaultPfp.webp"}
                    className="rounded-circle pfp"
                    alt=""
                    width={50}
                  />
                )}
              </Link>
            </li>
          </div>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">
              Signup
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <motion.nav
      className="navbar navbar-expand-lg text-white nav-height"     
    >
      <div className="container-fluid">
        <Link className="navbar-brand " to="/">
          ReFurnished
        </Link>
        <button
          className="navbar-toggler bg-danger"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/browse">
                Browse
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact Us
              </NavLink>
            </li>
            {loggedin ? (
              <>
                <li className="nav-item border-start border-dark border-3">
                  <NavLink className="nav-link" to="/add">
                    Add Furniture
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>

                {user && user.isAdmin ? (
                  <>
                    <li className="nav-item border-start border-3 border-dark">
                      <NavLink className="nav-link" to="/webadmin">
                        Admin
                      </NavLink>
                    </li>
                  </>
                ) : null}
              </>
            ) : null}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ">
            {displayUserOption()}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
