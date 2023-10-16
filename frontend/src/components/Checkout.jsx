import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const { id } = useParams();
  const [furnitureData, setFurnitureData] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  const [promoCodeName, setPromoCodeName] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const navigate = useNavigate();
  const currencyFormat = (num) => {
    return "₹ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const PromoCodes = {
    FLAT500: 500,
    FLAT1000: 1000,
    FLAT1500: 1500,
    FLAT20000: 20000,
  };

  const OrderSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Min. 4 characters required")
      .required("Name is Required"),
    address: Yup.object().shape({
      line1: Yup.string().required("Address is Required"),
      state: Yup.string().required("State is Required"),
      city: Yup.string().required("City is Required"),
      pincode: Yup.number().required("Pincode is Required"),
      phone: Yup.number()
        .required("Phone is Required")
        .min(10)
        .integer()
        .positive(),
    }),
    paymentMethod: Yup.string().required("Payment Method is Required"),
  });

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
          setTotalPrice(data.price);
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

  const orderForm = useFormik({
    initialValues: {
      user_id: "",
      product_id: "",
      seller_id: "",
      seller_name: "",
      product_name: "",
      image: "",
      price: "",
      name: "",
      date: "",
      email: "",
      address: {
        line1: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      },
      paymentMethod: "Cash on Delivery",
      status: "Processing",
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      values.user_id = JSON.parse(sessionStorage.user)._id;
      values.product_id = furnitureData._id;
      values.seller_id = furnitureData.user_id;
      values.seller_name = furnitureData.user_name;
      values.product_name = furnitureData.title;
      values.image = furnitureData.image;
      values.date = new Date().toLocaleDateString();
      values.price = totalPrice;
      values.email = JSON.parse(sessionStorage.user).email;
      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 3000);

      // send the data to the server

      const res = await fetch("http://localhost:5000/order/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Nice",
          text: "Your Order is placed successfully",
        })
          .then((result) => {
            navigate("/myorders");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!!",
          text: "Something went wrong",
        });
      }
    },
    validationSchema: OrderSchema,
  });

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
                  <small className="text-muted">
                    Type: {furnitureData.type}
                  </small>
                </div>
                <span className="text-muted">
                  {currencyFormat(furnitureData.price)}
                </span>
              </li>

              {promoCode ? 
              (
                <div>
                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                      <h6 className="my-0">Promo code</h6>
                      <small>{promoCodeName}</small>
                    </div>
                    <span className="text-success">
                      - {currencyFormat(promoCode)}
                      <br />
                      <Link to="" className="text-danger text-decoration-underline" onClick={
                        ()=>{
                          setPromoCode(null);
                          setPromoCodeName(null);
                          setTotalPrice(furnitureData.price);
                          toast.error("Promo Code Removed");
                        }
                      }>Remove</Link>
                    </span>
                  </li>
                </div>
              ) : null}
            </ul>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>{currencyFormat(totalPrice)}</strong>
            </li>

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="promoCode" // Use name attribute to link it with Formik
                  onChange={orderForm.handleChange}
                  value={orderForm.values.promoCode} // Link the input field to Formik values
                />
                <div className="input-group-append">
                  { !promoCodeName ?
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      if (
                        PromoCodes[orderForm.values.promoCode] &&
                        PromoCodes[orderForm.values.promoCode] <=
                          furnitureData.price
                      ) {
                        setPromoCode(PromoCodes[orderForm.values.promoCode]);
                        setPromoCodeName(orderForm.values.promoCode);
                        toast.success("Promo Code Applied");
                        setTotalPrice(totalPrice - PromoCodes[orderForm.values.promoCode]);
                      } else {
                        toast.error("Invalid Promo Code");
                      }
                    }}
                  >
                    Redeem
                  </button>

                  : <button
                  type="button"
                  className="btn btn-secondary disabled"
                >
                  Redeem
                </button> }
                   
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>

            <form onSubmit={orderForm.handleSubmit}>
              <div className="mb-3">
                <label>Full Name</label>
                <span
                  style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}
                >
                  {orderForm.touched.name && orderForm.errors.name}
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={orderForm.handleChange}
                  value={orderForm.values.name}
                />
              </div>
              <div className="mb-3">
                <label>Address</label>
                {orderForm.touched.address &&
                  orderForm.touched.address.line1 && (
                    <span
                      style={{
                        fontSize: "0.8em",
                        color: "red",
                        marginLeft: 20,
                      }}
                    >
                      {orderForm.errors.address &&
                        orderForm.errors.address.line1}
                    </span>
                  )}
                <input
                  type="text"
                  className="form-control"
                  name="address.line1"
                  onChange={orderForm.handleChange}
                  value={orderForm.values.address.line1}
                />
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>State</label>
                  <span
                    style={{
                      fontSize: "0.8em",
                      color: "red",
                      marginLeft: 20,
                    }}
                  >
                    {orderForm.errors.address && orderForm.errors.address.state}
                  </span>
                  <select
                    className="custom-select d-block w-100 form-control"
                    name="address.state"
                    onChange={orderForm.handleChange}
                    value={orderForm.values.address.state}
                  >
                    <option value="">Choose...</option>
                    <option>Uttar Pradesh</option>
                  </select>
                </div>
                <div className="col-md-5 mb-3">
                  <label>City</label>
                  <span
                    style={{
                      fontSize: "0.8em",
                      color: "red",
                      marginLeft: 20,
                    }}
                  >
                    {orderForm.errors.address && orderForm.errors.address.city}
                  </span>
                  <select
                    className="custom-select d-block w-100 form-control"
                    name="address.city"
                    onChange={orderForm.handleChange}
                    value={orderForm.values.address.city}
                  >
                    <option value="">Choose...</option>
                    <option>Lucknow</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>Pin Code</label>
                  <span
                    style={{
                      fontSize: "0.8em",
                      color: "red",
                      marginLeft: 20,
                    }}
                  >
                    {orderForm.errors.address &&
                      orderForm.errors.address.pincode}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="address.pincode"
                    onChange={orderForm.handleChange}
                    value={orderForm.values.address.pincode}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Phone</label>
                  <span
                    style={{
                      fontSize: "0.8em",
                      color: "red",
                      marginLeft: 20,
                    }}
                  >
                    {orderForm.errors.address && orderForm.errors.address.phone}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="address.phone"
                    onChange={orderForm.handleChange}
                    value={orderForm.values.address.phone}
                  />
                </div>
              </div>
              <h4 className="mb-3">Payment</h4>
              <span
                style={{
                  fontSize: "0.8em",
                  color: "red",
                  marginLeft: 20,
                }}
              >
                {orderForm.errors.paymentMethod &&
                  orderForm.errors.paymentMethod}
              </span>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="cash"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    defaultChecked=""
                    required=""
                  />
                  <label
                    className="custom-control-label"
                    name="Cash on Delivery"
                  >
                    Cash on Delivery
                  </label>
                </div>
              </div>
              <hr className="mb-4" />
              <button
                disabled={orderForm.isSubmitting}
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                {orderForm.isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span>Loading ...</span>
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
