import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ManageOrder = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [orderData, setOrderData] = useState(null);

  const fetchOrderData = async () => {
    const res = await fetch(`http://localhost:5000/order/getbyid/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setOrderData(data);
    }
  };

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line
  }, []);

  const submitForm = async (values, { setSubmitting }) => {
    console.log(values);
    const res = await fetch(`http://localhost:5000/order/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Status of update: " + res.status);

    if (res.status === 200) {
      toast.success("Status Updated Successfully");
      navigate(-1);
    } else {
      toast.error("Something went wrong");
    }
    setSubmitting(false);
  };

  return (
    <div>
      {orderData &&
      JSON.parse(sessionStorage.user)._id === orderData.seller_id ? (
        <div className="container mx-auto row">

          <div className="card col-md-6 mx-auto shadow mt-5">
            <div className="card-body">
              {orderData !== null ? (
                <Formik initialValues={orderData} onSubmit={submitForm}>
                  {(orderForm) => (
                    <form className="" onSubmit={orderForm.handleSubmit}>
                      <h3 className="text-center">Manage Status</h3>
                      {sessionStorage.user &&
                      JSON.parse(sessionStorage.user)._id ===
                        orderData.seller_id ? (
                        <>
                          <label>Status:</label>
                          <select
                            className="form-control"
                            name="status"
                            onChange={orderForm.handleChange}
                            value={orderForm.values.status}
                          >
                            <option value="">Select..</option>
                            <option value="Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </>
                      ) : null}
                      <button
                        disabled={orderForm.isSubmitting}
                        type="submit"
                        className="btn btn-primary mt-5 w-100"
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
                          "Submit"
                        )}
                      </button>
                    </form>
                  )}
                </Formik>
              ) : (
                <h1>Loading ... </h1>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>Edit Price</h1>
          <hr />
          <div className="card shadow">
            <div className="card-body">
              <p>You are not authorized to edit this product</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/home")}
              >
                Go back to Home Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
