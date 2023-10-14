import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [furnitureData, setFurnitureData] = useState(null);
  const navigate = useNavigate();
  const currencyFormat = (num) => {
    return "₹ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/product/getbyid/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setFurnitureData(data);
          console.log(data.name);
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        navigate("/404");
      }
    };

    fetchData();
  }, [id, navigate]);

  if (!furnitureData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container vh-100 p-0">
      <div className="row">
        <div className="col-md-4">
          <img
            className="card img-fluid shadow"
            src={"http://localhost:5000/" + furnitureData.image}
            alt=""
          />
        </div>
        <div className="col-md-8">
          <div className="p-5">
            <h1>{furnitureData.title}</h1>
            <h5 className="text-success">
              MRP: {currencyFormat(furnitureData.price)}
            </h5>
            <hr />
            <h4>Description:</h4>
            <p>{furnitureData.description}</p>
            <hr />
            <p>Year: {furnitureData.year}</p>
            <p>Type: {furnitureData.type}</p>
            {furnitureData.user_id === JSON.parse(sessionStorage.user)._id ? (
              <button
                className="btn btn-warning"
                onClick={() => navigate("/editproduct/" + furnitureData._id)}
              >
                Edit Product
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => navigate("/checkout/" + furnitureData._id)}
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
