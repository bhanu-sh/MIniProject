import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Admin = () => {

  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);

  const fetchProductData = async () => {
    const res = await fetch("http://localhost:5000/product/getall");
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setProductData(data);
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
    <div className='container'>
        <h1 className='text-center text-decoration-underline text-white pb-5'>Admin Dashboard</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h1 className='text-center'>Total Users</h1>
                <hr/>
                <h2 className='text-center'>{userData.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h1 className='text-center'>Total Products</h1>
                <hr/>
                <h2 className='text-center'>{productData.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h1 className='text-center'>Orders</h1>
                <hr/>
                <h2 className='text-center'>0</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                <h1 className=''>Manage Users</h1>
                <button className='btn btn-warning' onClick={() => navigate("/manageuser")}>Click here</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                <h1 className=''>Manage Products</h1>
                <button className='btn btn-warning' onClick={() => navigate("/allproducts")}>Click here</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                <h1 className=''>Manage Orders</h1>
                <button className='btn btn-warning'>Click here</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Admin