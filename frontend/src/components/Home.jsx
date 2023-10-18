import React from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Zoom from "react-reveal/Zoom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: "100vh" }}
    >
      <div className="header vh-94">
        <div className="main vh-94">
          <div className="container">
            <div className="text-center py-5">
              <h1 className="mt-5">
                Welcome to <span className="text-red"> ReFurnished </span>{" "}
              </h1>
              <h4 className="mt-4">
                Your destination for high-quality, pre-loved furniture.
              </h4>
              {/* <h6>Discover unique pieces to transform your space or sell your furniture with ease. Embrace sustainable living and shop smart at ReFurnished today.</h6> */}
            </div>

            <div className="row gx-5 text-center">
              <div className="col-md-4 py-2">
                <Zoom>
                  <div className="card dark p-3 tagline min-card">
                    <img
                      className="img-fluid rounded m-auto d-block"
                      src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
                      width={50}
                      alt=""
                    />
                    <h4 className="pb-2">Get Best Prices.</h4>
                  </div>
                </Zoom>
              </div>
              <div className="col-md-4 py-2">
                <Zoom>
                  <div className="card dark p-3 tagline min-card">
                    <img
                      className="img-fluid rounded m-auto d-block"
                      src="https://cdn-icons-png.flaticon.com/512/1198/1198368.png"
                      width={50}
                      alt=""
                    />
                    <h4 className="">Get Quality Furnitures.</h4>
                  </div>
                </Zoom>
              </div>
              <div className="col-md-4 py-2">
                <Zoom>
                  <div className="card dark p-3 tagline min-card">
                    <img
                      className="img-fluid rounded m-auto d-block"
                      src="https://cdn-icons-png.flaticon.com/512/5530/5530525.png"
                      width={50}
                      alt=""
                    />
                    <h4 className="pb-2">Inspected before listing.</h4>
                  </div>
                </Zoom>
              </div>
            </div>

            <div className="pt-3">
              <a href="#b0">
                <img
                  className="img-fluid rounded mx-auto d-block pulldown"
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
        <div className="container">
          <h1 className="pb-3">Furnitures:</h1>
          <div className="row gx-5">
            <div className="col-md-3 py-2">
              <Zoom>
                <div className="card">
                  <img
                    className="card img-resize img-fluid"
                    src="https://wakefitdev.gumlet.io/img/npl_modified_images/BeD_RubberNew/bed_WSWB7860RIC/bed_WSWB7860RIC_1.jpg?w=732"
                    alt=""
                  />
                  <button
                    className="btn btn-secondary mx-auto w-50 my-2"
                    onClick={() => navigate("/browse?selectedType=Bed")}
                  >
                    Bed
                  </button>
                </div>
              </Zoom>
            </div>
            <div className="col-md-3 col-xs-6 py-2">
            <Zoom>
              <div className="card">
                <img
                  className="card img-resize img-fluid"
                  src="https://rukminim1.flixcart.com/image/300/300/xif0q/dining-chair/4/x/p/44-45-2-na-rosewood-sheesham-44-45-10-sdwr258-allie-wood-walnut-original-imagpn6n2uk7fxuk.jpeg"
                  alt=""
                />
                <button
                  className="btn btn-secondary mx-auto w-50 my-2"
                  onClick={() => navigate("/browse?selectedType=Chair")}
                >
                  Chair
                </button>
              </div>
              </Zoom>
            </div>
            <div className="col-md-3 col-xs-6 py-2">
            <Zoom>
              <div className="card">
                <img
                  className="card img-resize img-fluid"
                  src="https://www.at-home.co.in/cdn/shop/files/Rebecca3strLS.jpg?v=1686905820"
                  alt=""
                />
                <button
                  className="btn btn-secondary mx-auto w-50 my-2"
                  onClick={() => navigate("/browse?selectedType=Sofa")}
                >
                  Sofa
                </button>
              </div>
              </Zoom>
            </div>
            <div className="col-md-3 col-xs-6 py-2">
            <Zoom>
              <div className="card">
                <img
                  className="card img-resize img-fluid"
                  src="https://www.topfurniture.co.uk/media/catalog/product/cache/f9ee10735343e429049fcc2a9855e0f1/f/l/flipto211-lichfield-flip-top-square-extending-oak-dining-table-90cm-to-180cm-size-1.jpg"
                  alt=""
                />
                <button
                  className="btn btn-secondary mx-auto w-50 my-2"
                  onClick={() => navigate("/browse?selectedType=Table")}
                >
                  Table
                </button>
              </div>
              </Zoom>
            </div>
          </div>
          <div className="text-center">
            <button
              className="btn btn-dark"
              onClick={() => navigate("/browse")}
            >
              All Products
            </button>
          </div>
        </div>
        <hr />

        <Footer />
      </div>
    </motion.div>
  );
};

export default Home;
