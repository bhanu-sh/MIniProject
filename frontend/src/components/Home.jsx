import React, { useState } from "react";
import furnitureList from "./dummydata";

const Home = () => {
  const [furnitureData] = useState(furnitureList);

  const displayData = () => {
    return furnitureData.map((furniture) => (
      <div className="col-md-3 py-2">
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
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <div className="header">
        <div className="main">
          <div className="container text-center">
            <div className="py-5">
              <h1 className="brand">ReFurnished</h1>
              <h5 className="tagline">Buy and Sell Old Furnitures</h5>
            </div>

            <div className="row gx-5">
              <div className="col">
                <div className="card p-3 tagline">
                  <img
                    className="img-fluid rounded m-auto d-block"
                    src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
                    width={50}
                    alt=""
                  />
                  <h4 className="pb-2">Get Best Prices.</h4>
                </div>
              </div>
              <div className="col">
                <div className="card p-3 tagline">
                  <img
                    className="img-fluid rounded m-auto d-block"
                    src="https://cdn-icons-png.flaticon.com/512/1198/1198368.png"
                    width={50}
                    alt=""
                  />
                  <h4 className="pb-2">Get Quality Furnitures.</h4>
                </div>
              </div>
              <div className="col">
                <div className="card p-3 tagline">
                  <img
                    className="img-fluid rounded m-auto d-block"
                    src="https://cdn-icons-png.flaticon.com/512/5530/5530525.png"
                    width={50}
                    alt=""
                  />
                  <h4 className="pb-2">Inspected before listing.</h4>
                </div>
              </div>
            </div>

            <div className="py-5">
              <h2>Click to see furnitures</h2>
              <a href="#b0">
                <img
                  className="img-fluid rounded mx-auto d-block"
                  src="https://cdn-icons-png.flaticon.com/512/59/59690.png"
                  width={100}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="browse" id="b0">
        <div className="text-center">
          <h1>Furnitures:</h1>
          <div className="row">{displayData()}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
