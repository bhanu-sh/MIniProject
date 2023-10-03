import React from "react";

const AddProduct = () => {
  return (
    <div className="container">
      <div className="">
        <h1 className="text-center">Add Furniture</h1>
        <div className="card py-3 px-5 w-50 mx-auto">
          <form className="" action="/addproduct" method="post">
            <label htmlFor="type">Type of Furniture:</label>
            <select className="form-control" id="type" name="type">
              <option value="sofa">Sofa</option>
              <option value="bed">Bed</option>
              <option value="table">Table</option>
              <option value="chair">Chair</option>
            </select>
            <label htmlFor="furniture_img">Upload Furniture Picture</label>
            <input className="form-control" type="file" />
            <button
              type="submit"
              className="btn btn-primary mt-5 w-100"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
