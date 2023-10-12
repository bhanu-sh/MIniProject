import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const MyProducts = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [noProductsAdded, setNoProductsAdded] = useState(false);

  const fetchProductData = async () => {
    const res = await fetch("http://localhost:5000/product/getall");
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setProductData(data);
      if (data.every((furniture) => furniture.user_id !== JSON.parse(sessionStorage.user)._id)) {
        setNoProductsAdded(true);
      } else {
        setNoProductsAdded(false);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(
          `http://localhost:5000/product/delete/${productId}`,
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
          fetchProductData();
        } else {
          // Handle errors, show an error message, or take appropriate action
          console.log("Error deleting product.");
          toast.error("Error deleting product.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Manage Products</h1>
      <div className="row">
        {productData.map((furniture) => {
          if (furniture.user_id === JSON.parse(sessionStorage.user)._id) {
            return (
              <>
                <div className="col-md-3 py-2 furniture-card">
                  <div className="card shadow">
                    {furniture.image ? (
                      <img
                        className="card img-resize img-fluid"
                        src={"http://localhost:5000/" + furniture.image}
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
                      <h4>Name: {furniture.title}</h4>
                      <h4>Year: {furniture.year}</h4>
                      {furniture.price ? (
                        <h2>Price: &#8377; {furniture.price} </h2>
                      ) : (
                        <h6 className="text-danger">Price Not Specified Yet</h6>
                      )}
                      <div className="row">
                        <div className="col-md-6 my-2">
                          <Link to={"/editproduct/" + furniture._id}>
                            <button className="btn btn-warning shadow text-center 2 w-100">
                              Edit
                            </button>
                          </Link>
                        </div>
                        <div className="col-md-6 my-2">
                          <button
                            onClick={() => handleDeleteProduct(furniture._id)}
                            className="btn btn-danger shadow text-center w-100"
                          >
                            Delete
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
        {noProductsAdded && (
        <div className="container">
          <h1>Edit Product</h1>
          <hr />
          <div className="card shadow">
            <div className="card-body">
              <p>You have not added any product.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/add")}
              >
                Add Products
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default MyProducts;
