import React from "react";
import "./index.scss";
import { NavLink} from 'react-router-dom';
import {faHome,faXmark} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function NavBar() {
    const [bevagyjelentkezeveBaszod, setBevagyjelentkezeveBaszod] = useState(undefined);
    const navigate = useNavigate();
    useEffect(()=>{
    if(!bevagyjelentkezeveBaszod && sessionStorage.getItem('loggedin')) {
        let user = JSON.parse(sessionStorage.getItem('loggedin'));
        setBevagyjelentkezeveBaszod(user);
        //console.log(user);
        //console.log('Sessionstorage loggedin: ', sessionStorage.getItem('loggedin'));
    }
    /*console.log(bevagyjelentkezeveBaszod);*/
    });

    return (
        <>
        <div className='nav-bar'>
    <nav>
        {!bevagyjelentkezeveBaszod && <NavLink
            exact="true" 
            activeclassname="active" 
            to="/">
            <FontAwesomeIcon icon={faHome} color="#ffffff"/>
        </NavLink>}
        <div className="dropdown">
            <p className="dropp" content="Menetrendek"><span>Menetrendek</span></p>
            <div className="dropdown-content"
                 style={{
                     height: `${(bevagyjelentkezeveBaszod && bevagyjelentkezeveBaszod.isAdmin) ? '280px' : '200px'}`
                 }
                 }
            >
                <NavLink 
                    exact="true"
                    activeclassname="active"
                    className="menetrendek-link-busz"
                    to="/menetrendek/bus">
                    Busz
                </NavLink>
                <NavLink 
                    exact="true"
                    activeclassname="active"
                    className="menetrendek-link-villamos"
                    to="/menetrendek/villamos">
                    Villamos
                </NavLink>
                <NavLink 
                    exact="true"
                    activeclassname="active"
                    className="menetrendek-link-troli"
                    to="/menetrendek/troli">
                    Troli
                </NavLink>
                {bevagyjelentkezeveBaszod && bevagyjelentkezeveBaszod.isAdmin &&
                    <NavLink
                    exact="true"
                    activeclassname="active"
                    className="menetrendek-link-busz"
                    to="/Menetrendek/AdminMenu">
                    Szerkesztés
                </NavLink>
                }
            </div>
        </div>
        {bevagyjelentkezeveBaszod &&
            <NavLink
            exact="true"
            activeclassname="active"
            className="news-link"
            to="/News">
            Hírfolyam
        </NavLink>}
        {!bevagyjelentkezeveBaszod &&
            <NavLink
                exact="true"
                activeclassname="active"
                to="/">
                Bejelentkezés/Regisztráció
            </NavLink>
        }
        {bevagyjelentkezeveBaszod &&
            <NavLink
                exact="true"
                activeclassname="active"
                className="profil-link"
                to="/profil">
                Profil
            </NavLink>
        }
        {bevagyjelentkezeveBaszod &&
            (
                <NavLink
                exact="true"
                activeclassname="active"
                className="logout"
                onClick={()=>{
                    sessionStorage.removeItem('loggedin');
                }}
                to="/Logout">
                <FontAwesomeIcon icon={faXmark}  color='#ffffff'/>
                </NavLink>
            )
        }
        <NavLink
            exact="true"
            activeclassname="active"
            className="help"
            to="/Help">
            Segítség
        </NavLink>
    </nav>
</div>
      </>
    );
}
export default NavBar;