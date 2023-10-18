import React from "react";
import { motion } from "framer-motion";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Min. 4 characters req.")
    .required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
});

const Contact = () => {
  const navigate = useNavigate();

  const contactForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 3000);

      // send the data to the server

      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/message/add",
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
        Swal.fire({
          icon: "success",
          title: "Nice",
          text: "Your message has been sent successfully",
        }).then((result) => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
    validationSchema: ContactSchema,
  });

  return (
    <motion.div
      className="container pt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: "100vh" }}
    >
      <div className="card col-md-4 mx-auto p-3">
        <form onSubmit={contactForm.handleSubmit}>
          <h2>Contact Us</h2>
          <hr />
          <label>Name</label>
          <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
            {contactForm.touched.name && contactForm.errors.name}
          </span>
          <input
            type="text"
            className="form-control mb-4"
            name="name"
            onChange={contactForm.handleChange}
            value={contactForm.values.name}
          />
          <label>Email</label>
          <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
            {contactForm.touched.email && contactForm.errors.email}
          </span>
          <input
            type="email"
            className="form-control mb-4"
            name="email"
            onChange={contactForm.handleChange}
            value={contactForm.values.email}
          />
          <label>Message</label>
          <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
            {contactForm.touched.message && contactForm.errors.message}
          </span>
          <textarea
            name="message"
            className="form-control mb-4"
            onChange={contactForm.handleChange}
            value={contactForm.values.message}
          />
          <button
            disabled={contactForm.isSubmitting}
            type="submit"
            className="btn btn-primary mt-5 w-100"
          >
            {contactForm.isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span>Loading ...</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
