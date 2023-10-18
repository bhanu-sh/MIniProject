import React from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      className="vh-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: "100vh" }}
    >
      <h1 className="text-center display-1 fw-bold">404</h1>
      <h1 className="text-center display-1 fw-bold">Page Not Found</h1>
    </motion.div>
  );
};

export default NotFound;
