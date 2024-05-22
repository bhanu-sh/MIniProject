import { useFormik } from "formik";
import React from "react";
import UseAppContext from "../AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const { setLoggedin } = UseAppContext();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/user/authenticate",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.status);

      if (res.status === 200) {
        toast.success("Login Successfull");
        navigate(-1);
        const data = await res.json();
        sessionStorage.setItem("user", JSON.stringify(data));
        setLoggedin(true);
      } else if (res.status === 401) {
        toast.error("Login Failed");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  return !sessionStorage.user ? (
    <motion.div
      className="py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="col-md-3 mx-auto">
        <div className="card shadow">
          <div className="card-body">
            <form onSubmit={loginForm.handleSubmit}>
              <h2 className="text-center my-5">Login Here</h2>

              <label>Email</label>
              <input
                id="email"
                onChange={loginForm.handleChange}
                value={loginForm.values.email}
                type="email"
                className="form-control mb-4"
              />
              <label>Password</label>
              <input
                id="password"
                onChange={loginForm.handleChange}
                value={loginForm.values.password}
                type="password"
                className="form-control mb-4"
              />

              <button type="submit" className="btn btn-primary w-100 mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.div
      className="py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: "100vh" }}
    >
      <div className="col-md-3 mx-auto">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="text-center my-5">You are already logged in</h2>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Login;
