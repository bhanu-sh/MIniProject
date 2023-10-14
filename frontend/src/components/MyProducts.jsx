import React, { useEffect, useState } from "react";
import Approved from "./Approved";
import Pending from "./Pending";

const MyProducts = () => {
  const [productData, setProductData] = useState([]);
  const [withoutPriceCount, setWithoutPriceCount] = useState(0);
  const [toggleEdit1, setToggleEdit1] = useState(false);
  const [toggleEdit2, setToggleEdit2] = useState(false);

  const fetchProductData = async () => {
    const res = await fetch("http://localhost:5000/product/getall");
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

  useEffect(() => {
    fetchProductData();
  }, []);

  const totalCount = productData.filter(
    (furniture) => furniture.user_id === JSON.parse(sessionStorage.user)._id
  ).length;

  return (
    <div className="container">
      <h1 className="text-center">Manage Products</h1>
      <div className="text-center">
        <div className="card mt-5">
          <div className="row ">
            <div className="col-md-6">
              <h1>Approved Products</h1>
            </div>
            <div className="col-md-6">
              <h1 className="text-success">{totalCount - withoutPriceCount}</h1>
            </div>
            <div className="col">
              <button
                className="btn btn-warning my-2"
                onClick={() => {
                  if (toggleEdit1) setToggleEdit1(false);
                  else setToggleEdit1(true);
                }}
              >
                {toggleEdit1 ? "Hide" : "View"}
              </button>
            </div>
          </div>
        </div>
        {toggleEdit1 && <Approved />}
        <div className="card mt-5">
          <div className="row">
            <div className="col-md-6">
              <h1>UnApproved Products</h1>
            </div>
            <div className="col-md-6">
              <h1 className="text-red">{withoutPriceCount}</h1>
            </div>
            <div className="col">
              {withoutPriceCount === 0 ? (
                <button
                  className="btn btn-warning my-2 disabled"
                  onClick={() => {
                    if (toggleEdit2) setToggleEdit2(false);
                    else setToggleEdit2(true);
                  }}
                >
                  View
                </button>
              ) : (
                <button
                  className="btn btn-warning my-2"
                  onClick={() => {
                    if (toggleEdit2) setToggleEdit2(false);
                    else setToggleEdit2(true);
                  }}
                >
                  {toggleEdit2 ? "Hide" : "View"}
                </button>
              )}
            </div>
          </div>
        </div>
        {toggleEdit2 && <Pending />}
      </div>
    </div>
  );
};

export default MyProducts;
