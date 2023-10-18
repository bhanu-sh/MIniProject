import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Browse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedType = queryParams.get("selectedType");
  const currencyFormat = (num) => {
    return "₹ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const [furnitureData, setFurnitureData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState(
    selectedType ? [selectedType] : []
  );

  const fetchProductData = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/product/getall"
    );
    if (res.status === 200) {
      const data = await res.json();
      setFurnitureData(data);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const displayData = () => {
    // Filter the furnitureData based on searchQuery and selectedTypes
    const filteredData = furnitureData.filter((furniture) => {
      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(furniture.type);
      const titleMatch = furniture.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return typeMatch && titleMatch;
    });

    return filteredData.map((furniture) =>
      furniture.price ? (
        <div
          className="col-md-3 py-2 furniture-card-browse"
          key={furniture._id}
        >
          <div className="card">
            <img
              className="card img-resize img-fluid"
              src={process.env.REACT_APP_BACKEND_URL + "/" + furniture.image}
              alt=""
            />
            <div className="card-body">
              <h3>{furniture.title}</h3>
              <h4 className="text-success">
                {currencyFormat(furniture.price)}
              </h4>
              <h6>Type: {furniture.type}</h6>
              <h6>Year: {furniture.year}</h6>
              <p className="text-secondary">Seller: {furniture.user_name}</p>
              <Link to={"/product/" + furniture._id}>
                <button className="btn btn-success text-center">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
      ) : null
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const selectOption = (type) => {
    if (selectedTypes.includes(type)) {
      // Remove the type if it exists in the selectedTypes array
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      // Add the type if it doesn't exist in the selectedTypes array
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: "100vh" }}
    >
      <header className="bg-filter text-white">
        <div className="container py-5">
          <h1 className="text-center">Browse Furnitures</h1>
          <hr />
          <input
            type="text"
            className="form-control"
            placeholder="Search Furniture"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="row mt-4">
            <div className="col-md-4 my-auto">
              <input
                checked={selectedTypes.includes("Bed")}
                onClick={() => selectOption("Bed")}
                className="form-check-input"
                type="checkbox"
              />
              Bed&nbsp;&nbsp;&nbsp;
              <input
                checked={selectedTypes.includes("Chair")}
                onClick={() => selectOption("Chair")}
                className="form-check-input"
                type="checkbox"
              />
              Chair&nbsp;&nbsp;&nbsp;
              <input
                checked={selectedTypes.includes("Sofa")}
                onClick={() => selectOption("Sofa")}
                className="form-check-input"
                type="checkbox"
              />
              Sofa&nbsp;&nbsp;&nbsp;
              <input
                checked={selectedTypes.includes("Table")}
                onClick={() => selectOption("Table")}
                className="form-check-input"
                type="checkbox"
              />
              Table&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </header>

      <hr />

      <div className="container">
        <div className="row">{displayData()}</div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Browse;
