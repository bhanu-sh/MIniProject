import React, { useState } from 'react'
import NoAccessUser from './NoAccessUser';

const UserAuth = ({children}) => {
    const [currentUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    );

    if(currentUser!==null){
        return children
    }else{
        return <NoAccessUser />
    }
}

export default UserAuth;