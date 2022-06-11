import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectUser} from '../app/userSlice';


export const ProtectedRoute = ({children}) => {
    const {user} = useSelector((state) => state.user);
    if(!user){
        return <Navigate to="/"/>
    }
    return children;

}