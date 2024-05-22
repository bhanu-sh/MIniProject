import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [noOrdersAdded, setNoOrdersAdded] = useState(false);

  const fetchOrderData = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/order/getall"
    );
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setOrderData(data);
      if (
        data.every(
          (order) => order.user_id !== JSON.parse(sessionStorage.user)._id
        )
      ) {
        setNoOrdersAdded(true);
      } else {
        setNoOrdersAdded(false);
      }
    }
  };

  const handleDeleteOrder = async (orderId, orderStatus) => {
    if (
      orderStatus === "Cancelled" ||
      orderStatus === "Delivered" ||
      orderStatus === "Dispatched"
    ) {
      toast.error("Order cannot be cancelled now.");
      return;
    }
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Order?"
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
          // You may want to show a success message or update the product list
          console.log("Product deleted successfully.");
          toast.success("Product deleted successfully.");
          // Refresh the product list after deletion
          fetchOrderData();
        } else {
          // Handle errors, show an error message, or take appropriate action
          console.log("Error deleting product.");
          toast.error("Error deleting product.");
        }
      } catch (error) {
        console.error("An error occurred: ", error);
        toast.error("An error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: "100vh" }}
    >
      <h1 className="mt-2">Orders</h1>
      <hr />
      <div className="row">
        {orderData.map((order) => {
          if (order.user_id === JSON.parse(sessionStorage.user)._id) {
            return (
              <>
                <div className="col-md-3 py-2 order-card">
                  <div className="card shadow">
                    {order.image ? (
                      <img
                        className="card img-resize img-fluid"
                        src={
                          "https://refurnished.s3.amazonaws.com/" + order.image
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

                    <div className="card-body shadow">
                      <h4>{order.product_name}</h4>
                      <p className="text-secondary">
                        Seller: {order.seller_name}
                      </p>
                      <h6 className="text-success">
                        Amount: &#8377; {order.price}{" "}
                      </h6>
                      <p>
                        Status:{" "}
                        <span className="text-success">{order.status}</span>
                      </p>
                      <div className="row">
                        <div className="col-md-6 my-2">
                          <button
                            onClick={() =>
                              handleDeleteOrder(order._id, order.status)
                            }
                            className="btn btn-danger shadow text-center w-100"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          } else {
            return null;
          }
        })}
        {noOrdersAdded && (
          <div className="container">
            <div className="card shadow">
              <div className="card-body">
                <p>You have not added any product.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/browse")}
                >
                  Buy?
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyOrders;
