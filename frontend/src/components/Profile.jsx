// eslint-disable-next-line
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Invalid JSON in sessionStorage.user", error);
        // Handle the error, possibly by redirecting to a login page
        navigate('/login');
      }
    } else {
      // Redirect to login if no user data is found
      navigate('/login');
    }
  }, [navigate]);

  const id = user?._id;

  const [userName, setUserName] = useState(
    user?.name
  );
  const [userEmail, setUserEmail] = useState(
    user?.email
  );
  const [userAvatar] = useState(user?.avatar);
  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState([]);
  const [yourOrderData, setYourOrderData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [selFile, setSelFile] = useState("");
  const [uploading, setUploading] = useState(false);

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

  const fetchProductData = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/product/getall"
    );
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      const userProducts = data.filter((product) => product.user_id === id);
      setProductData(userProducts);
    }
  };

  const fetchOrderData = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/order/getall`
    );
    if (res.status === 200) {
      const data = await res.json();
      const userOrders = data.filter((order) => order.user_id === id);
      const sellerOrders = data.filter((order) => order.seller_id === id);
      setYourOrderData(userOrders);
      setOrderData(sellerOrders);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchProductData();
    fetchOrderData();
    // eslint-disable-next-line
  }, []);

  const submitForm = async (values, { setSubmitting }) => {
    console.log(values);
    values.avatar = selFile;
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
      setUserEmail(values.email);
      setUserName(values.name);
      setToggleEdit(false);
    }
    setSubmitting(false);
  };

  const uploadFile = async (e) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `/util/deletefile/${userData.avatar}`,
        {
          method: "DELETE",
        }
      );

      if (res.status === 200) {
        console.log("Image deleted successfully.");
        toast.success("Image deleted successfully.");
      } else {
        console.log("Error deleting Image.");
        toast.error("Error deleting Image.");
      }
    } catch (error) {
      console.error("An error occurred in image deletion:", error);
      toast.error("An error occurred in image deletion.");
    }

    try {
      setUploading(true);
      if (!e.target.files) return;

      const file = e.target.files[0];
      console.log(file.name);

      const fd = new FormData();
      fd.append("myfile", file);

      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/util/uploadfile",
        {
          method: "POST",
          body: fd,
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        setSelFile(data.fileUrl);
        console.log(data.fileUrl);
      } else {
        console.error("File upload failed");
      }
      console.log(res.status);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: "100vh" }}
    >
      <div className="container">
        <h1 className="text-center mb-5 text-decoration-underline">
          My Account
        </h1>
        <div className="">
          <div className="row">
            <div className="col-md-2 ms-2 my-2 text-center">
              <img
                src={process.env.REACT_APP_AWS_PATH + "/" + userAvatar}
                width={120}
                height={120}
                className="rounded-circle shadow"
                alt="Profile"
              />
            </div>
            <div className="col-md-9 p-3">
              <h6>Name: {userName}</h6>
              <h6>E-Mail: {userEmail}</h6>
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
                          />

                          <input type="file" onChange={uploadFile} />

                          <button
                            disabled={signupForm.isSubmitting || uploading}
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
                              <>{uploading ? "Uploading..." : "Submit"}</>
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
        <hr />
        <h3 className="text-center text-decoration-underline">Buyer Section</h3>
        <div className="row">
          <div className="col-md-4 mt-4 mx-auto">
            <div className="card text-center">
              <div className="card-body">
                <h1>Your Orders</h1>
                <hr />
                <h2>{yourOrderData.length}</h2>
                <hr />
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/myorders")}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h3 className="text-center text-decoration-underline">
          Seller Section
        </h3>
        <div className="row">
          <div className="col-md-4 mt-4 mx-auto">
            <div className="card text-center">
              <div className="card-body">
                <h1>My Furnitures</h1>
                <hr />
                <h2>{productData.length}</h2>
                <hr />
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/myproducts")}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-4 mx-auto">
            <div className="card text-center">
              <div className="card-body">
                <h1>Orders</h1>
                <hr />
                <h2>{orderData.length}</h2>
                <hr />
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/userorders")}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </motion.div>
  );
};

export default Profile;
