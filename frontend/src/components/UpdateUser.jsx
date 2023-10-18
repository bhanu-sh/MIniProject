import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const UpdateUser = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/user/getbyid/${id}`
    );
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setUserData(data);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, []);

  const submitForm = async (values, { setSubmitting }) => {
    console.log(values);

    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/user/update/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.status);

    if (res.status === 200) {
      toast.success("User Updated Successfully");
    }
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <h1>Update User</h1>
        <hr />

        <div className="card shadow">
          <div className="card-body">
            {userData !== null ? (
              <Formik initialValues={userData} onSubmit={submitForm}>
                {(signupForm) => (
                  <form onSubmit={signupForm.handleSubmit}>
                    <h3 className="text-center">Edit Details:</h3>
                    <hr />

                    <label>Name</label>

                    <span
                      style={{
                        fontSize: "0.8em",
                        color: "red",
                        marginLeft: 20,
                      }}
                    >
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
                    <span
                      style={{
                        fontSize: "0.8em",
                        color: "red",
                        marginLeft: 20,
                      }}
                    >
                      {signupForm.touched.email && signupForm.errors.email}
                    </span>
                    <input
                      className="form-control mb-4"
                      name="email"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.email}
                    />

                    <label>Password</label>
                    <span
                      style={{
                        fontSize: "0.8em",
                        color: "red",
                        marginLeft: 20,
                      }}
                    >
                      {signupForm.errors.password}
                    </span>
                    <input
                      type="password"
                      className="form-control mb-4"
                      name="password"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.password}
                    />

                    {/* <input type="file" onChange={uploadFile} /> */}

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
                )}
              </Formik>
            ) : (
              <h1>Loading ... </h1>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UpdateUser;
