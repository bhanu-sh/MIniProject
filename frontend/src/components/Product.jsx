import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

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
          process.env.REACT_APP_BACKEND_URL + `/product/getbyid/${id}`
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
    <motion.div
      className="container vh-100 p-0 mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: "100vh" }}
    >
      <div className="row">
        <div className="col-md-4">
          <img
            className="card img-fluid shadow"
            src={process.env.REACT_APP_AWS_PATH + "/" + furnitureData.image}
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
            {sessionStorage.user &&
            furnitureData.user_id === JSON.parse(sessionStorage.user)._id ? (
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
    </motion.div>
  );
};

export default Product;
