import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [selFile, setSelFile] = useState();

  const [furnitureData, setFurnitureData] = useState(null);

  const uploadFile = async (e) => {
    if (!e.target.files || e.target.files === "") return;

    const file = e.target.files[0];
    console.log(file.name);
    setSelFile(file.name);

    const fd = new FormData();
    fd.append("myfile", file);

    const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/util/uploadfile", {
      method: "POST",
      body: fd,
    });

    console.log("Status of upload: " + res.status);
  };

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
    values.image = selFile;
    console.log(values);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/product/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Status of update: " + res.status);

    if (res.status === 200) {
      toast.success("Product Updated Successfully");
      navigate(-1);
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
          <h1>Edit Product</h1>
          <hr />

          <div className="card col-md-6 mx-auto shadow">
            <div className="card-body">
              {furnitureData !== null ? (
                <Formik initialValues={furnitureData} onSubmit={submitForm}>
                  {(productForm) => (
                    <form className="" onSubmit={productForm.handleSubmit}>
                    <h3 className="text-center">Add Furniture</h3>
                    <label>Product Name</label>
                    <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
                      {productForm.touched.title && productForm.errors.title}
                    </span>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      onChange={productForm.handleChange}
                      value={productForm.values.title}
                    />
                    <label>Type of Furniture:</label>
                    <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
                      {productForm.touched.type && productForm.errors.type}
                    </span>
                    <select
                      className="form-control"
                      name="type"
                      onChange={productForm.handleChange}
                      value={productForm.values.type}
                    >
                      <option value="">Select</option>
                      <option value="Sofa">Sofa</option>
                      <option value="Bed">Bed</option>
                      <option value="Table">Table</option>
                      <option value="Chair">Chair</option>
                    </select>
                    <label>Product Description:</label>
                    <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
                      {productForm.touched.description &&
                        productForm.errors.description}
                    </span>
                    <textarea
                      className="form-control"
                      name="description"
                      id="desc"
                      cols="30"
                      rows="5"
                      onChange={productForm.handleChange}
                      value={productForm.values.description}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const currentValue = productForm.values.description || '';
                          const cursorPosition = e.target.selectionStart;
                          const newValue =
                            currentValue.substring(0, cursorPosition) +
                            '\n' +
                            currentValue.substring(cursorPosition);
                          productForm.setFieldValue('description', newValue);
                        }
                      }}
                    ></textarea>
                    <label>Purchased in Year:</label>
                    <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
                      {productForm.touched.year && productForm.errors.year}
                    </span>
                    <input
                      className="form-control"
                      type="number"
                      name="year"
                      onChange={productForm.handleChange}
                      value={productForm.values.year}
                    />
                    {sessionStorage.user &&
                    JSON.parse(sessionStorage.user).isAdmin ? (
                      <>
                        <label>Price:</label>
                        <input
                          className="form-control"
                          type="number"
                          name="price"
                          onChange={productForm.handleChange}
                          value={productForm.values.price}
                        />
                      </>
                    ) : null}
                    <label>Upload Furniture Picture</label>
                    <input
                      className="form-control"
                      name="image"
                      type="file"
                      onChange={uploadFile}
                    />
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
          <h1>Edit Product</h1>
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
