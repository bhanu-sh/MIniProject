import React, { useEffect, useState } from "react";
import furnitureList from "./dummydata";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [furnitureData, setFurnitureData] = useState(null);
  const navigate = useNavigate();
  const currencyFormat = (num) => {
    return "₹ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  useEffect(() => {
    // Use Array.find() to find the furniture object by ID
    const selectedFurniture = furnitureList.find(
      (item) => item.id === parseInt(id, 10)
    );

    if (selectedFurniture) {
      setFurnitureData(selectedFurniture);
      console.log(selectedFurniture.name);
    } else {
      navigate("/404");
    }
  }, [id]);

  if (!furnitureData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container vh-100 card p-0">
      <div className="row">
        <div className="col-md-4">
          <img className="card img-fluid shadow" src={furnitureData.image} alt="" />
        </div>
        <div className="col-md-8">
          <div className="p-5">
            <h1>{furnitureData.name}</h1>
            <p>Year: {furnitureData.year}</p>
            <p>Type: {furnitureData.type}</p>
            <h6>MRP: {currencyFormat(furnitureData.price)}</h6>
            <hr />
            <h4>Description:</h4>
            <p>{furnitureData.description}</p>
            <hr />
            <button className="btn btn-success">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
