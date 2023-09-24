import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserAuth = ({children}) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    );

    if(currentUser!==null){
        return children
    }else{
        Swal.fire({
            icon : 'warning',
            title: 'Not Permitted!!',
            text : 'Please Login to Continue'
        });

        return <Navigate to="/login" />
    }
}

export default UserAuth;