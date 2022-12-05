import React from "react";
import './index.scss';
import {Outlet} from 'react-router-dom';
import NavBar from '../Navbar';
import {useEffect} from "react";

const Layout = () => {
    return(
        <div className="container">
            <NavBar/>
            <div className="page">
            <Outlet/>
            </div>
        </div>
    )
}

export default Layout;