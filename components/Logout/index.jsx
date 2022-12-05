import React, {useEffect} from "react";
import "./index.scss";
import cry from '../../assets/cry.png';
import pikachu from '../../assets/pikachu.png'
import {NavLink, useNavigate} from 'react-router-dom';

const Logout = () => {
    const nav = useNavigate();
    useEffect(()=>{
    sessionStorage.removeItem('loggedin');
    setTimeout(()=>{
        nav('/');
        nav(0);
    }, 3000)
    });

    return(
        <>
        <div className="LogoutClass">
            <h1>Kijelentkeztél :(</h1>
            <img src={cry} alt="Crying for loggin out"></img>
            <NavLink
                exact="true"
                activeclassname="active"
                className="home-link"
                to="/">
                
            
                <button >Vissza a Főoldalra</button>
                </NavLink>
                <img className="pikachu" src={pikachu} alt="itspichaku"></img>
                </div>
        </>
    )
}

export default Logout;