import React from 'react'
import { useNavigate } from 'react-router-dom';

const NoAcessAdmin = () => {
    const navigate = useNavigate();
  return (
    <div className='container'>
      <div className='card'> 
        <div className='card-body text-center'>
          <h3>Not Permitted!!</h3>
          <hr />
          <p>Please Login as Admin to Continue</p>
          <button className='btn btn-warning' onClick={()=> navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoAcessAdmin