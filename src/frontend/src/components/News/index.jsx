import React, {useEffect} from 'react';
import './index.scss';
import {useState} from "react";

const News = () => {

    const [news, setNews] = useState([]);
    const [newsObjects, setNewsObjects] = useState([]);
    //const [newsDisplay, setNewsDisplay] = useState(<></>);
    const [error, setError] = useState('');
    let isAdmin = JSON.parse(sessionStorage.getItem('loggedin')).isAdmin;

    let displayNews;

    if(news.length <= 0) {
        fetch('/api/news', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            console.log('News in REACT: ', res.news);
            setNewsObjects(res.news);
            displayNews = (res.news.map((n, index) => (
                <div className="news-row " key={n.ID}>
                    <h2>{n.title}</h2>
                    <h3>{n.description}</h3>
                    <p>{n._publishDate}</p>
                    {isAdmin && <button onClick={()=>deleteNews(n.ID)}>Törlés</button>}
                </div>
            )));
            setNews(displayNews);
        }).catch(e => console.error(e));
    }

    const [newsData, setNewsData] = useState({
        category: '',
        title: '',
        description: ''
    })

    const updateData = (e)=>{
        //console.log(newsData)
        setNewsData({ ...newsData, [e.target.name]: e.target.value });
    }

    const addNews = ()=>{
            if(newsData.title.length <= 0 || newsData.category.length <= 0 || newsData.description.length <= 0){
                setError('Minden mező kitöltése kötelező!');
                return;
            }
            console.log('Creating news..');
        fetch('/api/createNews', {
         method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsData)
        }).then(res=>res.json()).then(res=>{
            if(res.success){
                console.log('News added successfully');
                // Adding new news to the objects array
                let newNew = res.news;
                let newNewsObject = newsObjects;
                newNewsObject.push(newNew);
                setNewsObjects(newNewsObject);
                let newNews = (
                    <div className="news-row " key={newNew.ID}>
                        <h2>{newNew.title}</h2>
                        <h3>{newNew.description}</h3>
                        <p>{newNew._publishDate}</p>
                        {isAdmin && <button onClick={()=>deleteNews(newNew.ID)}>Törlés</button>}
                    </div>
                );
                let newsDisplay = news;
                newsDisplay.push(newNews);
                setNews(newsDisplay);
                setError('Hír sikeresen hozzáadva!');
            }else{
                setError(res.error);
            }
        }).catch(e=>console.error(e));
    }

    const  addNewsForAdmin = (
        <>
        <h3>Hír hozzáadása</h3>
            {error}
    <form>
        <input type="text" name='category' placeholder="Kategória" onChange={(e)=>updateData(e)}></input>
        <input type="text" name='title' placeholder="Cím" onChange={(e)=>updateData(e)}></input>
        <textarea placeholder="Leírás" name='description' onChange={(e)=>updateData(e)}></textarea>
    </form>
    <div className="newsbutton">
            <button onClick={addNews}>Hír feltöltése</button>
            </div>
        </>
    )

    const deleteNews=(id)=>{
        console.log('deleting news with id: ', id);
        fetch('/api/deleteNews', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then(res=>res.json()).then(res=>{
            if(res.success){
                console.log('Hír törölve');
                setNews([]);
            }else{
                setError(res.error);
            }
        }).catch(e=>console.error(e));
    }

    return(
        <>
            <h1>Hírfolyam</h1>
        <div className="news-wrapper">
            <div className="news-container">
                {news}
            </div>
            <div className="news-subscription">
                {JSON.parse(sessionStorage.getItem('loggedin')).isAdmin && addNewsForAdmin}
            </div>
        </div>
        </>
    );
}

export default News;