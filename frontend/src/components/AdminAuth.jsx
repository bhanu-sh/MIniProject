import React, { useState } from 'react'
import NoAccessAdmin from './NoAccessAdmin';

const AdminAuth = ({children}) => {
    const [currentUser] = useState(
        JSON.parse(sessionStorage.user)._id
    );

    if(currentUser !== null && process.env.REACT_APP_ADMIN === currentUser){
        return children
    }else{
        return <NoAccessAdmin />
    }
}

export default AdminAuth