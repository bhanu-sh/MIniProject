import React from "react";
import Footer from "./Footer";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="header vh-94">
        <div className="main vh-94">
          <div className="container text-center">
            <div className="">
              <h1 className="brand">ReFurnished</h1>
              <h5 className="tagline">Buy and Sell Old Furnitures</h5>
            </div>

            <div className="row gx-5">
              <div className="col-md-4 py-2">
                <div className="card dark p-3 tagline">
                  <img
                    className="img-fluid rounded m-auto d-block"
                    src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
                    width={50}
                    alt=""
                  />
                  <h4 className="pb-2">Get Best Prices.</h4>
                </div>
              </div>
              <div className="col-md-4 py-2">
                <div className="card dark p-3 tagline">
                  <img
                    className="img-fluid rounded m-auto d-block"
                    src="https://cdn-icons-png.flaticon.com/512/1198/1198368.png"
                    width={50}
                    alt=""
                  />
                  <h4 className="">Get Quality Furnitures.</h4>
                </div>
              </div>
              <div className="col-md-4 py-2">
                <div className="card dark p-3 tagline">
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

            <div className="pt-5">
              <a href="#b0">
                <img
                  className="img-fluid rounded mx-auto d-block"
                  src="https://www.freeiconspng.com/uploads/white-down-arrow-png-2.png"
                  width={100}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5" id="b0">
        <div className="text-center container">
          <h1 className="pb-3">Furnitures:</h1>
          <div className="row gx-5">
            <div className="col-md-3 py-2">
              <div className="card">
                <img
                  className="card img-resize img-fluid"
                  src="https://wakefitdev.gumlet.io/img/npl_modified_images/BeD_RubberNew/bed_WSWB7860RIC/bed_WSWB7860RIC_1.jpg?w=732"
                  alt=""
                />
                <button className="btn btn-secondary mx-auto w-50 my-2">
                  Bed
                </button>
                
              </div>
            </div>
            <div className="col-md-3 col-xs-6 py-2">
              <div className="card">
                <img
                  className="card img-resize img-fluid"
                  src="https://rukminim1.flixcart.com/image/300/300/xif0q/dining-chair/4/x/p/44-45-2-na-rosewood-sheesham-44-45-10-sdwr258-allie-wood-walnut-original-imagpn6n2uk7fxuk.jpeg"
                  alt=""
                />
                <button className="btn btn-secondary mx-auto w-50 my-2">
                  Chair
                </button>
              </div>
            </div>
            <div className="col-md-3 col-xs-6 py-2">
              <div className="card">
                <img
                  className="card img-resize img-fluid"
                  src="https://www.at-home.co.in/cdn/shop/files/Rebecca3strLS.jpg?v=1686905820"
                  alt=""
                />
                <button className="btn btn-secondary mx-auto w-50 my-2">
                  Sofa
                </button>
              </div>
            </div>
            <div className="col-md-3 col-xs-6 py-2">
              <div className="card">
                <img
                  className="card img-resize img-fluid"
                  src="https://www.topfurniture.co.uk/media/catalog/product/cache/f9ee10735343e429049fcc2a9855e0f1/f/l/flipto211-lichfield-flip-top-square-extending-oak-dining-table-90cm-to-180cm-size-1.jpg"
                  alt=""
                />
                <button className="btn btn-secondary mx-auto w-50 my-2">
                  Table
                </button>
              </div>
            </div>
          </div>
          <Link to="/browse">
            <button className="btn btn-dark">All Products</button>
          </Link>
          

          

        </div>
        <hr />
        
        <Footer />
      </div>
    </div>
  );
};

export default Home;
