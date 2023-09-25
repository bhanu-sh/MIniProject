import React from 'react'

const AddProduct = () => {
  return (
    <div className="container">
        <div className="">
            <h1 className='text-center'>Add Furniture</h1>
            <div className="card py-3 px-5 w-50 mx-auto">
                <form className='' action="/addproduct" method="post">
                    <label htmlFor="type">Type of Furniture:</label>
                    <select className='form-control' id="type">
                        <option value="sofa">Sofa</option>
                        <option value="bed">Bed</option>
                        <option value="table">Table</option>
                        <option value="chair">Chair</option>
                    </select>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddProduct