import './index.scss';
import { MapContainer, TileLayer, Popup, Marker  } from 'react-leaflet';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
const position = [46.253, 20.14824];

const Villamos = () => {

    const [tramsList, setTramsList] = useState([]);
    const [error, setError] = useState('');
    const [markersOfTram, setMarkersOfTram] = useState();
    let tramList;
    let trams = [];
    if(tramsList.length <= 0){
        fetch('/api/tram', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            trams = res.trams;
            console.log("Data got successfully!", trams);
            tramList = trams.map((b, index)=>(
                <div className="ticket" key={b.id}>
                    <div>
                        <ul className="ticket-list-1">
                            <li>Járatszám: {b.serviceNumber}</li>
                        </ul>
                        <ul className="ticket-list-2">
                            {b.stops.length >0 && <li>Honnan: {b.stops[0].name}</li>}
                            {b.stops.length >0 && <li>Hová: {b.stops[b.stops.length-1].name}</li>}
                        </ul>
                        <button onClick={()=>setMapMarkers(b.id)}>Részletek</button>
                        {sessionStorage.getItem('loggedin') &&
                            <button onClick={() => {
                                ticketPurchase(b.id);
                            }}>Megveszem</button>
                        }
                    </div>
                </div>
            ));
            if(!tramsList || tramsList.length <= 0){
                setTramsList(tramList);
            }
        });
    }

    const ticketPurchase = (id)=>{
        console.log('Buying ticket for service: ', id);
        fetch('/api/ticketPurchase', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({jaratID: id})
        }).then(res=>{
            if(res.status === 200){
                setError('Sikeres jegyvásárlás!++');
                alert('Sikeres jegyvásárlás!++');
            }else{
                res.json().then(res=>setError(res.error));
            }
        })
    }
    const setMapMarkers = (id)=> {
        console.log('Setting up markers, tramsList: ', tramsList)
        for(let t of trams){
            if(t.stops.length <= 0){
                continue;
            }
            console.log('Tram stops:', t.stops);
            if(t.id === id) {
                setMarkersOfTram(t.stops.map((stop, stopIndex) => (
                    <Marker position={stop.location} key={stopIndex}>
                        <Popup>
                            {stop.name}<br></br>
                            {"Időpontok: " + stop.arrivalTime}
                        </Popup>
                    </Marker>
                )));
            }
        }
    }

    return(
        <>
            <div className="header">
                <h1>Villamos menetrendek</h1>
            </div>
            <div className="wrapper">
                <div className="menetrendek">
                    {tramsList}
                </div>
                <div className="map-wrap">
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markersOfTram}
                    </MapContainer>
                </div>
            </div>
        </>
    );
}

export default Villamos;
