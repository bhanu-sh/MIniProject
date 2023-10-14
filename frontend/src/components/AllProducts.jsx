import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AllProducts = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);

  const fetchProductData = async () => {
    const res = await fetch("http://localhost:5000/product/getall");
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setProductData(data);
    }
  };

  const handleDeleteProduct = async (productId, productImage) => {
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
      try {
        const res = await fetch(
          `http://localhost:5000/util/deletefile/${productImage}`,
          {
            method: "DELETE",
          }
        );

        if (res.status === 200) {
          // Delete was successful
          // You may want to show a success message or update the product list
          console.log("Product's Image deleted successfully.");
          toast.success("Product's Image deleted successfully.");
          // Refresh the product list after deletion
          fetchProductData();
        } else {
          // Handle errors, show an error message, or take appropriate action
          console.log("Error deleting product's Image.");
          toast.error("Error deleting product's Image.");
        }
      } catch (error) {
        console.error("An error occurred in image deletion:", error);
        toast.error("An error occurred in image deletion.");
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
                      <h4>{furniture.title}</h4>
                      <h6>Type: {furniture.type}</h6>
                      <h6>Year: {furniture.year}</h6>
                      <p className="text-secondary">Seller: {furniture.user_name}</p>
                      {furniture.price ? (
                        <h5 className="text-success">Price: &#8377; {furniture.price} </h5>
                      ) : (
                        <h6 className="text-danger">Price Not Specified Yet</h6>
                      )}
                      <div className="text-center my-2">

                        <button className="btn btn-warning shadow text-center 2 w-100" onClick={() => navigate("/manageproduct/" + furniture._id)}>
                          Edit Price
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          );
        })}
      </div>

      {productData.length === 0 ? (

        <div className="container">
          <h1>Edit Product</h1>
          <hr />
          <div className="card shadow">
            <div className="card-body">
              <p>No Product is Added.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/add")}
              >
                Add Products
              </button>
            </div>
          </div>
        </div>)
      : null}
    </div>
  );
};

export default AllProducts;
