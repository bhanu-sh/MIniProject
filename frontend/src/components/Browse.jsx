import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Browse = () => {
  // const { type } = useParams();

  const [furnitureData, setFurnitureData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const fetchProductData = async () => {
    const res = await fetch("http://localhost:5000/product/getall");
    console.log(res.status);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setFurnitureData(data);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const displayData = () => {
    return furnitureData.map((furniture) => (
      <div className="col-md-3 py-2 furniture-card " 
      key={furniture.type}
      >
        <div className="card">
          <img
            className="card img-resize img-fluid"
            src={"http://localhost:5000/" + furniture.image}
            alt=""
          />
          <div className="card-body">
            <h4>{furniture.title}</h4>
            <h3>{furniture.year}</h3>
            <h2>&#8377; {furniture.price}</h2>
            <div className="">
              <Link to={"/product/" + furniture._id}>
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
    let filteredData = furnitureData;

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
    //eslint-disable-next-line
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
      <header className="text-white">
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

      <hr />

      <div className="container">
        <div className="row">{displayData()}</div>
      </div>
    </div>
  );
};

export default Browse;
