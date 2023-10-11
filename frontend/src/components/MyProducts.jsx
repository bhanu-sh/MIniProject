import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const MyProducts = () => {

    const [productData, setProductData] = useState([]);

    const fetchProductData = async () => {
        const res = await fetch('http://localhost:5000/product/getall');
        console.log(res.status);

        if(res.status === 200){
            const data = await res.json();
            console.log(data);
            setProductData(data);
        }
    };



    useEffect(() => {
        fetchProductData();
    
    }, [])

  return (
    <div className='container py-5'>
        <h1 className='text-center'>Manage Products</h1>

        <table className='table table-dark'>
            <thead>
                <tr className='text-center'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th colSpan={2}>Action</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {
                    productData.map( (product) => {
                        return <tr>
                            <td>{product._id}</td>
                            <td>{product.title}</td>
                            <td>{product.type}</td>
                            <td>{product.description}</td>
                            <td><img src={"http://localhost:5000/product/"+ product.image} alt="product" /></td>
                            <td>{product.price}</td>
                            
                            <td>
                                <button className='btn btn-danger'>Delete</button>
                            </td>
                            <td>
                                <Link to={'/updateuser/'+product._id} className='btn btn-primary'>
                                    View User
                                </Link>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>

    </div>
  )
}

export default MyProducts