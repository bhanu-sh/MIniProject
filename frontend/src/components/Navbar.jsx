import React from "react";
import { NavLink, Link } from "react-router-dom";
import UseAppContext from "../AppContext";
import "../App.css";

const Navbar = () => {
  const { loggedin, logout } = UseAppContext();

  const displayUserOption = () => {
    if (loggedin) {
      return (
        <>
          <li className="nav-item mt-1 me-2">
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </li>
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
    <nav className="navbar navbar-expand-lg text-white nav-height">
      <div className="container-fluid">
        <a className="navbar-brand " href="/">
          ReFurnished
        </a>
        <button
          className="navbar-toggler"
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
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/manageuser">
                Manage User
              </NavLink>
            </li> */}
            {loggedin ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/add">
                    Add Furniture
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {displayUserOption()}
            {
              loggedin ?
                <>
                  <li>
                    <Link to="/profile">
                      <img
                        height={50}
                        width={50}
                        className="rounded-circle"
                        src={"/Assets/defaultPfp.webp"}
                        alt="avatar"
                      />
                    </Link>
                  </li>
                </>
              : null
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;