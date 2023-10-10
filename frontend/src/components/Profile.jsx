/* eslint-disable */

import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Formik } from "formik";

const Profile = () => {
  const id = JSON.parse(sessionStorage.user)._id;

  const [userName, setUserName] = useState(
    JSON.parse(sessionStorage.user).name
  );
  const [userEmail, setUserEmail] = useState(
    JSON.parse(sessionStorage.user).email
  );
  const [userAvatar, setUserAvatar] = useState(
    JSON.parse(sessionStorage.user).avatar
  );

  console.log(id);

  const [editInfo, setEditInfo] = useState(null);

  const [userData, setUserData] = useState(null);

  const [toggleEdit, setToggleEdit] = useState(false);

  const fetchUserData = async () => {
    const res = await fetch(`http://localhost:5000/user/getbyid/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setUserData(data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const submitForm = async (values, { setSubmitting }) => {
    console.log(values);

    const res = await fetch(`http://localhost:5000/user/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res.status);

    if (res.status === 200) {
      toast.success("User Updated Successfully");
      setUserEmail(values.email);
      setUserName(values.name);
      setToggleEdit(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="">
      <div className="container">
        <h1 className="text-center mb-5 text-decoration-underline">
          My Account
        </h1>
        <div className="card shadow">
          <div className="row">
            <div className="col-md-2 ms-2 my-2   text-center">
              <img
                src={"http://localhost:5000/" + userAvatar}
                width={200}
                height={200}
                className="rounded-circle shadow"
                alt="Profile"
              />
            </div>
            <div className="col-md-9 p-3 border-start">
              <h5>Name: {userName}</h5>
              <h5>E-Mail: {userEmail}</h5>
              <button
                className="btn btn-warning mt-3"
                onClick={() => {
                  if (toggleEdit) setToggleEdit(false);
                  else setToggleEdit(true);
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {toggleEdit ? (
          <>
            <div className="edit-details mt-5">
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
                            {signupForm.touched.email &&
                              signupForm.errors.email}
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
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
