import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AllOrders = () => {
  // const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);

  const fetchOrderData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + "order/getall");
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setOrderData(data);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/order/delete/${orderId}`,
          {
            method: "DELETE",
          }
        );

        if (res.status === 200) {
          // Delete was successful
          // You may want to show a success message or update the order list
          console.log("Order deleted successfully.");
          toast.success("Order deleted successfully.");
          // Refresh the order list after deletion
          fetchOrderData();
        } else {
          // Handle errors, show an error message, or take appropriate action
          console.log("Error deleting order.");
          toast.error("Error deleting order.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <>
      <motion.div
        className="container"
        style={{ height: "100vh" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-center">Manage Orders</h1>
        <div className="row">
          {orderData.map((order) => {
            return (
              <>
                <div className="card my-2">
                  <div className="row">
                    <div className="col-md-3 card-body">
                      {order.image ? (
                        <img
                          className="card mx-auto img-resize img-fluid"
                          src={
                            process.env.REACT_APP_BACKEND_URL +
                            "/" +
                            order.image
                          }
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
                            {order.price ? (
                              <h6 className="text-success">
                                Price: &#8377; {order.price}{" "}
                              </h6>
                            ) : (
                              <h6 className="text-danger">
                                Price Not Specified Yet
                              </h6>
                            )}
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
                        onClick={() =>
                          handleDeleteOrder(order._id, order.image)
                        }
                        className="btn btn-danger shadow text-center w-50 mt-5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        {orderData.length === 0 ? (
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
      </motion.div>
    </>
  );
};

export default AllOrders;
