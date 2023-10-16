import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const UserAllOrders = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [noData, setNoData] = useState(false)

  const fetchOrderData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/order/getall");
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setOrderData(data);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  useEffect(() => {
    // Check if there's no data and set the noData state accordingly
    if (orderData.length === 0 || orderData.every(order => order.seller_id !== JSON.parse(sessionStorage.user)._id || order.status === "Cancelled")) {
      setNoData(true);
    } else {
      setNoData(false);
    }
  }, [orderData]);

  return (
    <>
      <div className="container">
        <h1 className="text-center">Manage Orders</h1>
        <div className="row">
          {orderData.map((order) => {
            if (
              order.seller_id !== JSON.parse(sessionStorage.user)._id ||
              order.status === "Cancelled"
            ) {
              return null;
            }
            return (
              <>
                <div className="card my-2">
                  <div className="row">
                    <div className="col-md-3 card-body">
                      {order.image ? (
                        <img
                          className="card mx-auto img-resize img-fluid"
                          src={process.env.REACT_APP_BACKEND_URL + "/" + order.image}
                          alt=""
                        />
                      ) : (
                        <img
                          className="card img-resize img-fluid"
                          src={
                            "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                          }
                          alt=""
                        />
                      )}
                    </div>
                    <div className="col-md-9 card-body">
                      <div className="row">
                        <div className="col-md-5 b">
                          <div className="">
                            <h4>{order.product_name}</h4>
                            <p className="text-secondary">
                              Seller: {order.seller_name}
                            </p>
                              <h6 className="text-success">
                                Amount: &#8377; {order.price}{" "}
                              </h6>
                            <p>
                              Order Date:{" "}
                              <span className="text-success">{order.date}</span>
                            </p>
                            <p>
                              Status:{" "}
                              <span className="text-success">
                                {order.status}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <h4>Delivery Address</h4>
                          <p>
                            {order.address.line1}, {order.address.city},{" "}
                            {order.address.state}, {order.address.pincode}
                          </p>
                          <p>
                            <b>Name: </b>
                            {order.name}
                          </p>
                          <p>
                            <b>Email: </b>
                            {order.email}
                          </p>
                          <p>
                            <b>Phone: </b>
                            {order.address.phone}
                          </p>
                          <span>
                            <button className="btn btn-success">
                              <a
                                className="text-white text-decoration-none"
                                href={`tel:${order.address.phone}`}
                              >
                                <i className="fas fa-phone" />
                              </a>
                            </button>
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {navigate("/manageorder/" + order._id)}
                        }
                        className="btn btn-dark shadow text-center w-25 mt-5"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        {(orderData.length === 0) || noData ? (
          <div className="container">
            <h1>Edit order</h1>
            <hr />
            <div className="card shadow">
              <div className="card-body">
                <p>No Orders..</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UserAllOrders