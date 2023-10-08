import React, { useEffect, useState } from "react";
import furnitureList from "./dummydata";
import { Link } from 'react-router-dom';

const Browse = () => {
  const [furnitureData, setFurnitureData] = useState(furnitureList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const displayData = () => {
    return furnitureData.map((furniture) => (
      <div className="col-md-3 py-2 furniture-card " key={furniture.id}>
        <div className="card">
          <img
            className="card img-resize img-fluid"
            src={furniture.image}
            alt=""
          />
          <div className="card-body">
            <h4>{furniture.name}</h4>
            <h3>{furniture.year}</h3>
            <h2>&#8377; {furniture.price}</h2>
            <div className="">
              <Link to={"/product/"+furniture._id}>
                <button className="btn btn-success text-center">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const searchFurniture = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchQuery(search);
  };

  useEffect(() => {
    let filteredData = furnitureList;

    if (searchQuery) {
      filteredData = filteredData.filter((furniture) =>
        furniture.name.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedTypes.length > 0) {
      filteredData = filteredData.filter((furniture) =>
        selectedTypes.includes(furniture.type)
      );
    }

    setFurnitureData(filteredData);
  }, [searchQuery, selectedTypes]);

  const handleTypeCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div>
      <header className="bg-dark text-white">
        <div className="container py-5">
          <h1 className="text-center">Browse Furnitures</h1>
          <hr />
          <input
            type="text"
            className="form-control"
            placeholder="Search Furniture"
            onChange={searchFurniture}
          />

          <div className="row mt-4">
            <div className="col-md-5">
              <select
                className="form-control w-25 mt-4"
                onChange={(e) => handleTypeCheckboxChange(e.target.value)}
              >
                <option value="">Furniture Type</option>
                {["Sofa", "Bed", "Table", "Chair"].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 my-auto">
              {["Sofa", "Bed", "Table", "Chair"].map((type) => (
                <label key={type} className="form-check-label">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeCheckboxChange(type)}
                  />
                  {type}&nbsp;&nbsp;&nbsp;
                </label>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row" >{displayData()}</div>
      </div>
    </div>
  );
};

export default Browse;