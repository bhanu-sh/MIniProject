import React, { useState } from 'react'
import NoAccess from './NoAccess';

const AdminAuth = ({children}) => {
    const [currentUser] = useState(
        JSON.parse(sessionStorage.user)._id
    );

    if(currentUser !== null && process.env.REACT_APP_ADMIN === currentUser){
        return children
    }else{
        return <NoAccess />
    }
}

export default AdminAuth