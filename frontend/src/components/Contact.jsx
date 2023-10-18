import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      className="container pt-5"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      style={{ height: "100vh" }}
    >
      <div className="card col-md-4 mx-auto p-3">
        <form method="post">
          <h2>Contact Us</h2>
          <input
            type="text"
            name="name"
            className="form-control mt-2"
            placeholder="Your Name"
            required=""
          />
          <input
            type="email"
            name="email"
            className="form-control mt-2"
            placeholder="Your Email"
            required=""
          />
          <textarea
            name="message"
            className="form-control mt-2"
            placeholder="Your Message"
            required=""
            defaultValue={""}
          />
          <button className="btn btn-primary mt-2" type="submit">
            Send
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
