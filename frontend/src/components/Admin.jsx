import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Admin = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [withoutPriceCount, setWithoutPriceCount] = useState(0);

  const fetchProductData = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/product/getall"
    );
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setProductData(data);

      const unpricedProductsCount = data.filter(
        (product) => !product.price
      ).length;
      setWithoutPriceCount(unpricedProductsCount);
    }
  };

  const fetchUserData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/user/getall`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setUserData(data);
    }
  };
  const fetchOrderData = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/order/getall`
    );
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setOrderData(data);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchUserData();
    fetchOrderData();
  }, []);

  return (
    <motion.div
      className="container"
      style={{ height: "100vh" }}
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
    >
      <h1 className="text-center text-decoration-underline mt-3">
        Admin Dashboard
      </h1>
      <div className="row">
        <div className="col-md-4 mt-4">
          <div className="card text-center">
            <div className="card-body">
              <h1>Total Users</h1>
              <hr />
              <h2>{userData.length}</h2>
              <hr />
              <button
                className="btn btn-warning"
                onClick={() => navigate("/manageuser")}
              >
                Manage Users
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card text-center">
            <div className="card-body">
              <h1>Total Products</h1>
              <hr />
              <h2>{productData.length}</h2>
              <hr />
              <button
                className="btn btn-warning"
                onClick={() => navigate("/allproducts")}
              >
                Manage Products
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card text-center">
            <div className="card-body">
              <h1>Unpriced Products</h1>
              <hr />
              <h2>{withoutPriceCount}</h2>
              <hr />
              <button
                className="btn btn-warning"
                onClick={() => navigate("/pricing")}
              >
                Manage Price
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card text-center">
            <div className="card-body">
              <h1>Total Orders</h1>
              <hr />
              <h2>{orderData.length}</h2>
              <hr />
              <button
                className="btn btn-warning"
                onClick={() => navigate("/allorders")}
              >
                Manage Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;
