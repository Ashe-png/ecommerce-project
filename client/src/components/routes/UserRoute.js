import React from 'react';
import {Route, Link, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect'
 
const UserRoute=() => {
    const { user } = useSelector((state) => ({...state}));

    return user && user.token ? <Outlet/> : 
    (<LoadingToRedirect/>);
        
};

export default UserRoute;