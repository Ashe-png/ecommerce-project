import React, { useEffect, useState } from 'react';
import {Route, Link, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import {currentAdmin} from '../../functions/auth'; 

const AdminRoute=() => {
    const { user } = useSelector((state) => ({...state}));
    const [ok, setOk]= useState(false);

    useEffect(()=> {
        if(user && user.token){
            currentAdmin(user.token)
            .then(res => {
                console.log('Current Admin res', res);
                setOk(true);
            })
            .catch(err => {
                console.log("Admin route err", err);
                setOk(false);
            })
        }
    },[user]);


    return ok ? <Outlet/> : 
    (<LoadingToRedirect/>);
        
};

export default AdminRoute;