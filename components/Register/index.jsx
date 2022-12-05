import React from 'react';
import './index.scss';
import { useState } from "react";
import {useNavigate} from "react-router-dom";



const Register = () => {
    const navigate = useNavigate();
    const [registrationInfo, setRegistrationInfo] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        passwordAgain: "",
        zipcode: "",
        street: "",
        houseNumber: "",
        birthDate: new Date()
    });
    const [error, setError] = useState('');
    const handleChange = (event) => {
        setRegistrationInfo({ ...registrationInfo, [event.target.name]: event.target.value });
    };



    const register = ()=>{
        console.log(registrationInfo);
        if(registrationInfo.email.length <= 0 || registrationInfo.password.length <= 0 || registrationInfo.lastName.length <= 0
            || registrationInfo.firstName.length <= 0 || registrationInfo.zipcode.length <= 0 || registrationInfo.street.length <= 0
            || registrationInfo.houseNumber.length <= 0){
            setError('All fields are required!');
        }else {
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationInfo)
            }).then(res => res.json()).then(res => {
                if(res.success){
                    console.log('Successful registration!');
                    navigate('/login');
                }else {
                    setError(res.error);
                }
            }).catch(e=>{
                console.error('Unable to connect to the register API! ', e);
            });
        }
    }

    return(
            <div className="form-container">
                <h2>Regisztrációs űrlap</h2>
                    <form className="form">
                        {error}

                        <label className="form__label" htmlFor="lastName">Vezetéknév:</label>
                        <input className="form__input" type="text" id="lastName" name="lastName" value={registrationInfo.lastName} onChange={handleChange} placeholder="Teszt" required/>

                        <label className="form__label" htmlFor="firstName">Keresztnév:</label>
                        <input className="form__input" type="text" id="firstName"  name="firstName" value={registrationInfo.firstName} onChange={handleChange} placeholder="Elek" required/>

                        <label className="form__label" htmlFor="email">Email cím:</label>
                        <input className="form__input" type="email" id="email"  name="email" value={registrationInfo.email} onChange={handleChange} placeholder="gyurcsanyaferi@akigyok-kigyoznak.hu" required/>

                        <label className="form__label" htmlFor="password">Jelszó:</label>
                        <input className="form__input" type="password"  id="password" name="password" value={registrationInfo.password} onChange={handleChange} placeholder="**********" required/>

                        <label className="form__label" htmlFor="passwordAgain">Jelszó megerősítése:</label>
                        <input className="form__input" type="password"  id="passwordAgain" name="passwordAgain" value={registrationInfo.passwordAgain} onChange={handleChange} placeholder="**********" required/>

                        <label className="form__label" htmlFor="zipcode">Irányítószám:</label>
                        <input className="form__input" type="text"  id="zipcode" name="zipcode" value={registrationInfo.zipcode} onChange={handleChange} placeholder="6725" required/>

                        <label className="form__label" htmlFor="street">Utca:</label>
                        <input className="form__input" type="text"  id="street" name="street" value={registrationInfo.street} onChange={handleChange} placeholder="Pl: Mars tér" required/>

                        <label className="form__label" htmlFor="houseNumber">Házszám:</label>
                        <input className="form__input" type="text"  id="houseNumber" name="houseNumber" value={registrationInfo.houseNumber} onChange={handleChange} placeholder="12" required/>

                        <label className="form__label" htmlFor="birthDate">Születési Dátum:</label>
                        <input className="form__input" type="date" id="birthDate" name="birthDate" onChange={handleChange} value={registrationInfo.birthDate} required/>
                    </form>
                <button onClick={register} className="submitbutton">Küldés</button>
            </div>
    );
}



export default Register;