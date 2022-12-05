import React, {useEffect, useState} from "react";
import './index.scss';
import {useNavigate} from "react-router-dom";

const AdminMenu = () => {

    //Lists
    const [busesList, setBusesList] = useState([]);
    const [tramsList, setTramsList] = useState([]);
    const [trolleysList, setTrolleysList] = useState([]);
    const [error, setError] = useState('');
    const nav = useNavigate();

    if(busesList.length <= 0){
        fetch('/api/bus', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            if(res.bus.length<=0){
                setBusesList((
                    <tr>
                        <td>NO DATA FOUND!</td>
                    </tr>
                ));
                return;
            }
            let bus = res.bus;
            //console.log("Bus Data got successfully!", bus);
            let busList = bus.map((b, index)=>(
                    <tr key={index}>
                        <td>{b.serviceNumber}</td>
                        <td>{b.stops.length > 0 && b.stops[0].name}</td>
                        <td>{b.stops.length > 0 && b.stops[b.stops.length-1].name}</td>
                        <td>
                            <button onClick={()=>{deleteService(b.id, b.serviceType)}}>Törlés</button>
                        </td>
                    </tr>
            ));
                setBusesList(busList);
        }).catch(e=>{
            console.error(e);
            setBusesList((
                <tr>
                    <td>NO DATA FOUND!</td>
                </tr>
            ));
        });
    }

    if(tramsList.length <= 0){
        fetch('/api/tram', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            if(res.trams.length<=0){
                setTramsList((
                    <tr>
                        <td>NO DATA FOUND!</td>
                    </tr>
                ));
                return;
            }
            let trams = res.trams;
            //console.log("Tram Data got successfully!", trams);
            let tramList = trams.map((b, index)=>(
                    <tr key={index}>
                        <td>{b.serviceNumber}</td>
                        <td>{b.stops.length > 0 && b.stops[0].name}</td>
                        <td>{b.stops.length > 0 && b.stops[b.stops.length-1].name}</td>
                        <td>
                            <button onClick={()=>{deleteService(b.id, b.serviceType)}}>Törlés</button>
                        </td>
                    </tr>
            ));
                setTramsList(tramList);

        }).catch(e=>{
            console.error(e);
            setTramsList((
            <tr>
                <td>NO DATA FOUND!</td>
            </tr>
            ));
        });
    }

    if(trolleysList.length <= 0){
        fetch('/api/trolley', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            if(res.trolley.length<=0){
                setTrolleysList((
                    <tr>
                        <td>NO DATA FOUND!</td>
                    </tr>
                ));
                return;
            }
            let trolley = res.trolley;
            //console.log("Trolley Data got successfully!", trolley);
            let trolleyList = trolley.map((b, index)=>(
                        <tr key={index}>
                            <td>{b.serviceNumber}</td>
                            <td>{b.stops.length > 0 && b.stops[0].name}</td>
                            <td>{b.stops.length > 0 && b.stops[b.stops.length - 1].name}</td>
                            <td>
                                <button onClick={() => {
                                    deleteService(b.id, b.serviceType)
                                }}>Törlés
                                </button>
                            </td>
                        </tr>
            ));
                setTrolleysList(trolleyList);
        }).catch(e=>{
            console.error(e);
            setTrolleysList((
            <tr>
                <td>NO DATA FOUND!</td>
            </tr>
            ));
        });
    }

    const deleteService = (id)=>{
        console.log('Deleting: ', id);
        fetch('/api/deleteService', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then(res=>{
            if(res.success){
                console.log("Service successfully deleted!");
                nav('/Menetrendek/AdminMenu');
                nav(0);
            }else{
                setError(res.error);
            }
        }).catch(e=>console.error(e));
    }

    const [number, setNumber] = useState('');
    const [type, setType] = useState('');

    const redirectToCreateService = ()=>{
        if(number.length <= 0 || type.length <= 0){
            setError('Minden adatot meg kell adni!');
        }else {
            sessionStorage.setItem('serviceNumber', JSON.stringify(number));
            sessionStorage.setItem('serviceType', JSON.stringify(type));
            nav('/menetrendek/adminMenu/adminMenuList');
            nav(0);
        }
    }

    return(
        <>
        <h1>Admin menu</h1>
        <div className="admin_container">
            <div className="route-list">
            <h3>Járatok kilistázása</h3>
            <h5>BUSZ menetrendek listázása:</h5>
                <div className="route-list-wrapper">
                    <table className="route-list-table">
                        <thead>
                        <tr>
                            <th>JÁRATSZÁM</th>
                            <th>HONNAN</th>
                            <th>HOVÁ</th>
                        </tr>
                        </thead>
                        <tbody>
            {busesList}
                        </tbody>
                    </table>
                </div>
            <h5>TROLI menetrendek listázása:</h5>
                <div className="route-list-wrapper">
                    <table className="route-list-table">
                        <thead>
                        <tr>
                            <th>JÁRATSZÁM</th>
                            <th>HONNAN</th>
                            <th>HOVÁ</th>
                        </tr>
                        </thead>
                    <tbody>
            {trolleysList}
                    </tbody>
                    </table>
                </div>
            <h5>VILLAMOS menetrendek listázása:</h5>
                <div className="route-list-wrapper">
                    <table className="route-list-table">
                        <thead>
                        <tr>
                            <th>JÁRATSZÁM</th>
                            <th>HONNAN</th>
                            <th>HOVÁ</th>
                        </tr>
                        </thead>
                    <tbody>
            {tramsList}
                    </tbody>
            </table>
        </div>
            </div>
            <div className="route-add-to-list">
            <h3>Járatok bevitele</h3>
                {error}
                <form className="stopinput">
                <label className="form__label" htmlFor="id">Járatszám:</label>
                <input className="form__input" type="text" id="id" name="id"  placeholder="pl.: 32" onChange={e=>setNumber(e.target.value)}/>
                    <label htmlFor='type' className='form__label'>
                        Service type:
                        </label>
                        <div className="select_container">
                        <select name="type" id='type' defaultValue='Válassz' onChange={e=>setType(e.target.value)}>
                            <option disabled>Válassz</option>
                            <option  value='BUSZ'>Busz</option>
                            <option value='VILL'>Villamos</option>
                            <option value='TROL'>Trolibusz</option>
                        </select>
                        </div>
                        <br/>
                </form>
                <div className="buttonholder">
                    <button onClick={redirectToCreateService} >Megállók megadása</button>
                </div>
            </div>
        </div>
        </>
)}

export default AdminMenu;