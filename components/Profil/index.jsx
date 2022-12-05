import React, {useEffect, useState} from "react";
import './index.scss';
import pepe from '../../assets/pepe.png'

const Profil = () =>{

    const [jegy, setJegy] = useState('');
    const [error, setError] = useState('');

    if(jegy.length <= 0) {
        fetch('/api/profile', {
            method: 'GET'
        }).then(res => res.json()).then((res) => {
            if(!res){
                console.log('No ticket found!');
            }else{
                let ticket = res.ticketToSend;
                //console.log(ticket);
                setJegy(
                    <>
                        <p>
                            Érvényes: {ticket.validity.split(':')[0] + ':' + ticket.validity.split(':')[1]}
                        </p>
                        <p>
                            Járat: {ticket.serviceTheTicketIsFor}
                        </p>
                        <p>
                            Típus: {ticket.type}
                        </p>
                    </>
                );
            }
        });
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');

    const updateProfile = ()=>{
        if(firstName.length <= 0 || lastName.length <= 0 || pass.length<=0 || pass2.length <=0){
            setError('Minden mezőt ki kell tölteni!');
            return;
        }
        fetch('/api/updateUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName: firstName, lastName: lastName, password: pass, passwordAgain: pass2})
        }).then(res=>res.json()).then(response=>{
            if(response.success){
                console.log('Sikeres módosítás!');
                setError('Sikeres adatmódosítás');
            }else {
                setError(response.error);
            }
        })
    }

    return(
        <>
        <h1>Profil</h1>
        <div className="wrapper">
            <div className="profile-datas">
                <form>
                    {error}
                    <input type="text" className="firstName" placeholder="Vezetéknév" name='firstName' onChange={e=>setFirstName(e.target.value)}></input>
                    <input type="text" className="lastName" placeholder="Keresztnév" name='lastName' onChange={e=>setLastName(e.target.value)}></input>
                    <p>Jelszó módósítása:</p>
                    <input type="password" className="username" placeholder="Új jelszó" name='password' onChange={e=>setPass(e.target.value)}></input>
                    <input type="password" className="username" placeholder="Jelszó megerősítése" name='passwordAgain' onChange={e=>setPass2(e.target.value)}></input>
                </form>
                <div className="profilbutton">
                <button onClick={updateProfile}  value="Változtatások mentése">Változtatások mentése</button>
                </div>
            </div>
            <div className="history">
                <div className="ticket-infos">
                <h1>EZ AZ UTOLJÁRA VÁSÁROLT JEGYED!!!</h1>
                <div className="pepeimg">
                    <img src={pepe} alt="EzegyPepe"/>
                </div>
                    <div className="ticketdatas">
                        {jegy}
                    </div>
                     
                </div>

            </div>
        </div>
        </>
    );
}

export default Profil;