import React from "react";
import { NavLink, Link } from "react-router-dom";
import UseAppContext from "../AppContext";
import "../App.css";

const Navbar = () => {

  const userJSON = sessionStorage.user;
  const user = userJSON ? JSON.parse(userJSON) : null;
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
                <li className="nav-item">
                  <NavLink className="nav-link" to="/myproducts">
                    My Furnitures
                  </NavLink>
                </li>
                {user && user._id === "65228b07a9c9f88468ea99a5" ? (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/manageuser">
                      Manage Users
                    </NavLink>
                  </li>
                ) : null}
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
                    {/* <div className="dropdown show pe-5">
                      <button className="btn dropdown-toggle" style={{border: "transparent"}} id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className='profileImage rounded-circle' height={50}
                        width={50} src={"/Assets/defaultPfp.webp"} alt='Profile'/>
                      </button>
      
                      <div className="dropdown-menu">                
                        <li><a className="dropdown-item" href="/myProfile">My Profile</a></li>
                        <li><a className="dropdown-item" href="/myDashboard">My Dashboard </a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="/signOut">Signout</a></li>
                      </div>
                    </div> */}
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

