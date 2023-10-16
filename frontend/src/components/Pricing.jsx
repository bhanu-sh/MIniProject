import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

const Pricing = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);

  const fetchProductData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/product/getall");
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setProductData(data);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (productData.every(furniture => furniture.price)) {
    return (
      <div className="container mt-5">
          <div className="card shadow">
            <div className="card-body">
              <p>No Product Pending..</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/webadmin")}
              >
                Admin Dashboard
              </button>
            </div>
          </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center text-decoration-underline">Products Without Price</h1>
      <div className="row">
        {productData.map((furniture) => {
          if (!furniture.price) {
            return (
              <>
                <div className="col-md-3 py-2 furniture-card">
                  <div className="card shadow">
                    {furniture.image ? (
                      <img
                        className="card img-resize img-fluid"
                        src={process.env.REACT_APP_BACKEND_URL + "/" + furniture.image}
                        alt=""
                      />
                    ) : (
                      <img
                        className="card img-resize img-fluid"
                        src={
                          "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                        }
                        alt=""
                      />
                    )}

                    <div className="card-body shadow">
                      <h4>Name: {furniture.title}</h4>
                      <h4>Year: {furniture.year}</h4>
                      <h5>Seller: {furniture.user_name}</h5>
                      {furniture.price ? (
                        <h2>Price: &#8377; {furniture.price} </h2>
                      ) : (
                        <h6 className="text-danger">Price Not Specified Yet</h6>
                      )}
                      <div className="text-center my-2">

                        <button className="btn btn-warning shadow text-center 2 w-100" onClick={() => navigate("/setprice/" + furniture._id)}>
                          Edit Price
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          } else {
            return null;
          }
        })}
      </div>

      {productData.length === 0 ? (
        <div className="container">
          <div className="card shadow">
            <div className="card-body">
              <p>No Product is Added.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/add")}
              >
                Add Products
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Pricing;
