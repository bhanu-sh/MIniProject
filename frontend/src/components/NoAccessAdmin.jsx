import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NoAcessAdmin = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: "100vh" }}
    >
      <div className="card">
        <div className="card-body text-center">
          <h3>Not Permitted!!</h3>
          <hr />
          <p>Please Login as Admin to Continue</p>
          <button
            className="btn btn-warning"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoAcessAdmin;
