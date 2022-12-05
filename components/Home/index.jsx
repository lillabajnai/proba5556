import React from "react";
import './index.scss';
import { NavLink} from 'react-router-dom';
import {useEffect} from "react";

const Home = () =>{
    return (
        <div>
                <div className="header_container">
                        <h1>Menetrendek</h1>
                </div>
                <div className="activity_buttons">
                        <div className="register">
                                <h2>Még nem regisztráltál? Kattints ide!</h2>
                                <NavLink className="registration-page" to="/register">
                                <button className="custom-btn home-button">Regisztráció</button>
                                </NavLink>
                                <br/>
                        </div>
                        <div className="login">
                                <h2>Már tag vagy? Lépj be!</h2>
                                <NavLink className="login-page" to="/login">
                                <button className="custom-btn home-button">Belépés</button>
                                </NavLink>
                                <br/>
                        </div>
                </div>
        </div>
    );
}


export default Home;