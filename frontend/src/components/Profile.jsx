import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Profile = () => {
  const navigate = useNavigate();
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
  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState([]);
  const [yourOrderData, setYourOrderData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);

  const fetchUserData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/user/getbyid/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setUserData(data);
    }
  };

  const fetchProductData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/product/getall");
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      const userProducts = data.filter((product) => product.user_id === id);
      setProductData(userProducts);
    }
  };

  const fetchOrderData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/order/getall`);
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
  }, []);

  const submitForm = async (values, { setSubmitting }) => {
    console.log(values);

    const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/user/update/${id}`, {
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
        <div className="">
          <div className="row">
            <div className="col-md-2 ms-2 my-2 text-center">
              <img
                src={process.env.REACT_APP_BACKEND_URL + "/" + userAvatar}
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
        <h3 className="text-center text-decoration-underline">Seller Section</h3>
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
    </div>
  );
};

export default Profile;
