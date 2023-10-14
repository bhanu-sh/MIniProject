import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [withoutPriceCount, setWithoutPriceCount] = useState(0);

  const fetchProductData = async () => {
    const res = await fetch("http://localhost:5000/product/getall");
    console.log(res.status);
  
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setProductData(data);
  
      const unpricedProductsCount = data.filter((product) => !product.price).length;
      setWithoutPriceCount(unpricedProductsCount);
    }
  };

  const fetchUserData = async () => {
    const res = await fetch(`http://localhost:5000/user/getall`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setUserData(data);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchUserData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center text-decoration-underline pb-5">
        Admin Dashboard
      </h1>
      <div className="row">
        <div className="col-md-4">
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
        <div className="col-md-4">
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
        <div className="col-md-4">
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
      </div>
    </div>
  );
};

export default Admin;