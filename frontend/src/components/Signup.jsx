import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useState } from "react";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Min. 4 characters req.")
    .required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const [selFile, setSelFile] = useState('');

  // initialize the formik
  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      values.avatar = selFile;
      setSubmitting(true);

      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 3000);

      // send the data to the server

      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.status);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Nice",
          text: "You have signed up successfully",
        })
          .then((result) => {
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!!",
          text: "Something went wrong",
        });
      }
    },
    validationSchema: SignupSchema,
  });

  const uploadFile = async (e) => {
    if(!e.target.files) return;

    const file = e.target.files[0];
    console.log(file.name);
    setSelFile(file.name);

    const fd = new FormData();
    fd.append('myfile', file);

    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/util/uploadfile', {
      method: 'POST',
      body: fd
    });

    console.log(res.status);

  }

  return (
    <div>
      <div className="col-md-4 mx-auto mt-5">
        <div className="card shadow">
          <div className="card-body ">
            <form onSubmit={signupForm.handleSubmit}>
              <h3 className="text-center">Signup Form</h3>
              <div className="row text-center mb-4">
                <Link to={"/signup"} className="text-decoration-none col-md-6 border-bottom border-primary border-4 text-primary">
                  <div><h5>User</h5></div>
                </Link>
                <Link to={"/adminsignup"} className="text-decoration-none col-md-6 text-black">
                  <div><h5>Admin</h5></div>
                </Link>
              </div>
              <label>Name</label>

              <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
                {signupForm.touched.name && signupForm.errors.name}
              </span>

              <input
                type="text"
                className="form-control mb-4"
                name="name"
                onChange={signupForm.handleChange}
                value={signupForm.values.name}
              />

              <label>Email</label>
              <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
                {signupForm.touched.email && signupForm.errors.email}
              </span>
              <input
                className="form-control mb-4"
                name="email"
                onChange={signupForm.handleChange}
                value={signupForm.values.email}
              />

              <label>Password</label>
              <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
                {signupForm.errors.password}
              </span>
              <input
                type="password"
                className="form-control mb-4"
                name="password"
                onChange={signupForm.handleChange}
                value={signupForm.values.password}
              />

              <label>Upload Profile Picture</label>
              <input className="form-control mb-4" type="file" onChange={uploadFile} />

              <button
                disabled={signupForm.isSubmitting}
                type="submit"
                className="btn btn-primary mt-5 w-100"
              >
                {signupForm.isSubmitting ? (
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
        </div>
      </div>
    </div>
  );
};

export default Signup;
