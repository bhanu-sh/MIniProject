import React from 'react'

const AddProduct = () => {
  return (
    <div className="container">
        <div className="">
            <h1>Add Furniture:</h1>
            <form className='' action="/addproduct" method="post">
                <select name="" id="type">Enter</select>
            </form>
        </div>
    </div>
  )
}

export default AddProduct