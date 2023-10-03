import React from "react";

const Product = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6">
          <img
            src="https://m.media-amazon.com/images/I/418QpEn9JKL._AC_UF894,1000_QL80_DpWeblab_.jpg"
            alt="chair"
            className="img-fluid rounded m-auto d-block"
          />
        </div>
        <div className="col-md-6">
          <div className="p-5">
            <h1>Product Name</h1>
            <h2>Price</h2>
            <ul className="product-detail">
              <li><p>Type: Product type</p></li>
              <li><p>Year: 2022</p></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
