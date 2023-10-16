import React, { useState } from 'react'
import NoAccessAdmin from './NoAccessAdmin';

const AdminAuth = ({children}) => {
    const [currentUser] = useState(
        JSON.parse(sessionStorage.user)
    );

    if(currentUser !== null && currentUser.isAdmin){
        return children
    }else{
        return <NoAccessAdmin />
    }
}

export default AdminAuth