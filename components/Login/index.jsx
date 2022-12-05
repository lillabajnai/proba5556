import './index.scss';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import data from "bootstrap/js/src/dom/data";


const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    

    const login = ()=>{
        //console.log('Logging in...');
        fetch('/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailAddress: email, passwordSec: password})
        }).then(res=>res.json()).then(res=>{
           if(!res.user) {
               console.log('Invalid login!');
               setError('Invalid email address or password!');
           }else{
                    console.log('Valid login!');
                    sessionStorage.setItem('loggedin', JSON.stringify(res.user));
                    refreshPage();
           }
        });
    }

    function refreshPage() {
        navigate('/Profil');
        navigate(0);
      }

    return(
    <>
    <div className="form">
          <div className="form-body">
              <h1>Bejelentkezési felület</h1>
              {error}
              <form>
        <label className="form__label" htmlFor="email">
                  Felhasználónév:
                  </label>
                  <input  
                    type="email"
                    name="email"
                    id="email"
                    className="form__input"
                    placeholder="Kukorica.Jancsi22@gmail.com"
                    onChange={(event)=>{
                        setEmail(event.target.value);
                    }}
                  />
        <label className="form__label" htmlFor="password">
                  Jelszó:
                  </label>
                  <input 
                    className="form__input" 
                    type="password"  
                    id="password"
                    placeholder="**********"
                    name="password"
                    onChange={(event)=>{
                        setPassword(event.target.value);
              }}
                  />
              </form>
              <div className="button_holder_loginon">
              <button onClick={login} >Bejelentkezés</button>
              </div>
            </div>
        </div>
    </>
    );
}

export default Login;