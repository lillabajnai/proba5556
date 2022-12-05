import React, {useState} from "react";
import './index.scss';

const Help = () =>{
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const [textarea, setTextarea] = useState("");
    return(
<>
<h1>Segítség</h1>
<div className="formholder">
    <div className="text-area">
        <p>Történ valami probléma az oldal használata közben?</p>
        <p>Írj nekünk, és segítünk!</p>
    </div>

    <form>
        <input onChange={(event)=>{setEmail(event.target.value)}} type="email" placeholder="Gyurcsanyaferi@akigyok-kigyoznak.hu"></input>
        <input onChange={(event)=>{setText(event.target.value)}} type="text" placeholder="Probléma témájának megnevezése"></input>
        <input onChange={(event)=>{setTextarea(event.target.value)}} type="textarea" placeholder="Probléma kifejtése"></input>
        <a href={`mailto:Gyurcsanyaferi@akigyok-kigyoznak.hu?subject=${text}&body=${textarea + "\n" + email}`}>Küldés</a>
    </form>
</div>
</>
    );
}

export default Help;