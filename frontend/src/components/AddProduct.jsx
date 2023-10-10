import React from "react";
import * as Yup from "yup";

const AddProduct = () => {
  const ProductSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Min. 4 characters req.")
      .required("{Product Name is Required"),
    type: Yup.string().required("Type of Furniture is Required"),
    description: Yup.string()
      .min(4, "Min. 4 characters req.")
      .required("{Product Description is Required"),
    image: Yup.string().required("Image is Required"),
  });

  // const uploadFile = async (e) => {
  //   if(!e.target.files) return;

  //   const file = e.target.files[0];
  //   console.log(file.name);
  //   setSelFile(file.name);

  //   const fd = new FormData();
  //   fd.append('myfile', file);

  //   const res = await fetch('http://localhost:5000/util/uploadfile', {
  //     method: 'POST',
  //     body: fd
  //   });

  //   console.log(res.status);

  // }

  return (
    <div className="container">
      <div className="">
        <h1 className="text-center">Add Furniture</h1>
        <div className="card py-3 px-5 w-50 mx-auto">
          <form className="" action="/addproduct" method="post">
            <label htmlFor="productName">Product Name</label>
            <input
              className="form-control"
              type="text"
              name="productName"
              id="productName"
            />
            <label htmlFor="type">Type of Furniture:</label>
            <select className="form-control" id="type" name="type">
              <option value="sofa">Sofa</option>
              <option value="bed">Bed</option>
              <option value="table">Table</option>
              <option value="chair">Chair</option>
            </select>
            <label htmlFor="description">Product Description:</label>
            <textarea
              className="form-control"
              name="description"
              id="desc"
              cols="30"
              rows="5"
            ></textarea>
            <label htmlFor="furniture_img">Upload Furniture Picture</label>
            <input className="form-control" type="file" />
            <button type="submit" className="btn btn-primary mt-5 w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
