import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-dark text-center text-white  ">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#dd4b39" }}
              to="mailto:bhanuelicit@gmail.com"
              role="button"
            >
              <i className="fab fa-google" />
            </Link>
            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              to="https://www.instagram.com/_bhanu_s/"
              role="button"
            >
              <i className="fab fa-instagram" />
            </Link>
            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              to="https://www.linkedin.com/in/bhanu-sharma-a4063b136/"
              role="button"
            >
              <i className="fab fa-linkedin-in" />
            </Link>
            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              to="https://github.com/bhanu-sh"
              role="button"
            >
              <i className="fab fa-github" />
            </Link>
          </section>
        </div>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:{" "}
          <Link className="text-white" to="/">
            ReFurnished
          </Link>
          <span className="mx-2 px-2 border-secondary border-start">Made by: <Link className="text-white" to="https://github.com/bhanu-sh">Bhanu</Link></span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
