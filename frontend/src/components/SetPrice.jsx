import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [furnitureData, setFurnitureData] = useState(null);


  const fetchFurnitureData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/product/getbyid/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setFurnitureData(data);
    }
  };

  useEffect(() => {
    fetchFurnitureData();
    // eslint-disable-next-line
  }, []);

  const submitForm = async (values, { setSubmitting }) => {
    console.log(values);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + 
      `/product/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Status of update: " + res.status);

    if (res.status === 200) {
      toast.success("Product Updated Successfully");
      navigate("/pricing");
    } else {
      toast.error("Something went wrong");
    }
    setSubmitting(false);
  };

  return (
    <div>
      {furnitureData &&
      (JSON.parse(sessionStorage.user)._id === furnitureData.user_id ||
        JSON.parse(sessionStorage.user).isAdmin) ? (
        <div className="container mx-auto row">
          <h1>Edit Price</h1>
          <hr />

          <div className="card col-md-6 mx-auto shadow">
            <div className="card-body">
              {furnitureData !== null ? (
                <Formik initialValues={furnitureData} onSubmit={submitForm}>
                  {(productForm) => (
                    <form className="" onSubmit={productForm.handleSubmit}>
                      <h3 className="text-center">Add Price</h3>
                      {sessionStorage.user &&
                      JSON.parse(sessionStorage.user).isAdmin ? (
                        <>
                          <label>Price:</label>
                          <span
                            style={{
                              fontSize: "0.8em",
                              color: "red",
                              marginLeft: 20,
                            }}
                          >
                            {productForm.touched.price &&
                              productForm.errors.price}
                          </span>
                          <input
                            className="form-control"
                            type="number"
                            name="price"
                            onChange={productForm.handleChange}
                            value={productForm.values.price}
                          />
                        </>
                      ) : null}
                      <button
                        disabled={productForm.isSubmitting}
                        type="submit"
                        className="btn btn-primary mt-5 w-100"
                      >
                        {productForm.isSubmitting ? (
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
                onClick={() => navigate("/myproducts")}
              >
                Go back to My Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
