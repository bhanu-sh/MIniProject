import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Checkout = () => {
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
    <>
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout form</h2>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge bg-secondary">1</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">{furnitureData.title}</h6>
                  <small className="text-muted">Type: {furnitureData.type}</small>
                </div>
                <span className="text-muted">{currencyFormat(furnitureData.price)}</span>
              </li>
              {/* <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span className="text-success">-$5</span>
              </li> */}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>{currencyFormat(furnitureData.price)}</strong>
              </li>
            </ul>
            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate="">
              <div className="mb-3">
                <label htmlFor="firstName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  defaultValue=""
                  required=""
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="line1"
                  required=""
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <select
                    className="custom-select d-block w-100 form-control"
                    id="state"
                    required=""
                  >
                    <option value="">Choose...</option>
                    <option>Uttar Pradesh</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">City</label>
                  <select
                    className="custom-select d-block w-100 form-control"
                    id="country"
                    required=""
                  >
                    <option value="">Choose...</option>
                    <option>Lucknow</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid City.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Pin Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">Pin code required.</div>
                </div>
              </div>
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="cash"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    defaultChecked= ""
                    required=""
                  />
                  <label className="custom-control-label" htmlFor="credit">
                    Cash on Delivery
                  </label>
                </div>
              </div>
              <hr className="mb-4" />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
