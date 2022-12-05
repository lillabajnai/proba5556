const Ticket = require('../models/Ticket');
const User = require("../models/User");
const Stop = require('../models/Stop');
const Service = require("../models/Service");
const Pass = require("../models/Pass");
const Stopping = require("../models/Stopping");
const News = require("../models/News");
const {query} = require("express");

class TransportationDAO{
    static QUERIES = {
        getUserQuery: 'SELECT * FROM UTAS WHERE email = ?',
        createUserQuery: 'INSERT INTO UTAS VALUES(?,?,?,?,?,?,?,?,?,?,?)',
        updateUserQuery: 'UPDATE UTAS SET jelszo = ?, vezeteknev = ?, keresztnev = ? WHERE email = ?',
        updateUserTicketIdentifierQuery: 'UPDATE UTAS SET jegyAzonosito = ? WHERE email = ?',
        updateUserPassIdentifierQuery: 'UPDATE UTAS SET berletAzonosito = ? WHERE email = ?',
        deleteUserQuery: 'DELETE FROM UTAS WHERE email = ?',
        createServiceQuery: 'INSERT INTO JARAT (vonalszam, tipus) VALUES(?, ?)',
        updateServiceQuery: 'UPDATE JARAT SET vonalszam =?, tipus= ? WHERE id = ?',
        deleteServiceQuery: 'DELETE FROM JARAT WHERE id =?',
        getServiceQuery: 'SELECT * FROM JARAT WHERE id = ?',
        getAllServiceQuery: "SELECT * FROM JARAT",
        getAllStopQuery: "SELECT * FROM MEGALLO",
        getAllUserQuery: "SELECT * FROM UTAS",
        createTicketQuery: 'INSERT INTO JEGY VALUES(?,?,?,?)',
        updateTicketQuery: 'UPDATE JEGY SET ar = ?, ervenyes = ?, ID = ? WHERE azonosito = ?',
        deleteTicketQuery: 'DELETE FROM UTAS WHERE azonosito = ?',
        getTicketQuery: 'SELECT * FROM JEGY',
        getTicketByServiceIDQuery: 'SELECT * FROM JEGY WHERE ID = ?',
        createPassQuery: 'INSERT INTO BERLET VALUES(?,?,?,?)',
        updatePasQuery: 'UPDATE BERLET SET ar = ?, ervenyes = ?, ID = ? WHERE azonosito = ?',
        deletePassQuery: 'DELETE FROM BERLET WHERE azonosito = ?',
        getPassQuery: 'SELECT * FROM BERLET WHERE azonosito = ?',
        createStopQuery: 'INSERT INTO Megallo VALUES (?, ?)',
        updateStopQuery: 'UPDATE Megallo SET hely = ? WHERE nev = ?',
        deleteStopQuery: 'DELETE FROM Megallo WHERE nev = ?',
        getStopQuery: 'SELECT * FROM MEGALLO WHERE nev = ?',
        createStoppingQuery: 'INSERT INTO megall VALUES (?, ?, ?)',
        updateStoppingQuery: 'UPDATE megall SET mikor = ? WHERE ID = ? AND nev = ?',
        deleteStoppingQuery: 'DELETE FROM megall WHERE ID = ? AND nev = ?',
        getStoppingQuery: 'SELECT MEGALL.ID AS ID, MEGALL.nev AS nev, MEGALL.mikor AS mikor, MEGALLO.hely AS hely FROM MEGALL INNER JOIN MEGALLO ON MEGALL.nev=MEGALLO.nev WHERE MEGALL.ID = ? ORDER BY mikor',
        createNewsQuery: 'INSERT INTO HIRFOLYAM (cim, kategória, leiras, kozzetel_datum) VALUES (?, ?, ?, ?)',
        updateNewsQuery: 'UPDATE HIRFOLYAM SET kategória = ?, cim = ?, leiras = ?, kozzetel_datum = ?',
        deleteNewsQuery: 'DELETE FROM HIRFOLYAM WHERE ID = ?',
        getNewsQuery: 'SELECT * FROM HIRFOLYAM'
    }
    constructor(){
        this.className = 'TransportationDAO => ';
       // this.router = require('express').Router();
        this.db = require('./config/db');
        this.serviceList = [];
    }

    /**
     * The most basic thing XD
     * @param queryString
     * @returns {Promise<unknown>}
     * @private Smart
     */
    __query(queryString){
        if(typeof queryString !== 'string'){
            throw new Error(this.className + 'Invalid string in query: ' + queryString);
        }
        return new Promise((resolve)=>{
           this.db.query(queryString, (err, result)=>{
               if(err)throw err;
               resolve(result);
           });
        });
    }

    /***
     * Az összes adatbázisban szereplő járatot visszaadja
     * @returns {Promise<Array<Service>>}
     */
    getAllServiceMagyarulJarat(){
        // Query elvégzése
        // Query egy tömböt ad vissza promiseként kezeljük
            return new Promise((resolve)=> {
                let queryResult =[];
                this.db.query(TransportationDAO.QUERIES.getAllServiceQuery, (error, result, next) => {
                    if (error) throw (error);
                    if (result && result.length > 0) {
                        console.log(this.className, 'Successful query!');
                    } else {
                        console.log(this.className, 'Empty query result!!');
                    }
                    // Konvertálás Service Típusra
                    for (let ser of result) {
                        let lofasz = new Service(ser['ID'],ser['vonalszam'], ser['tipus']);
                        this.getStopping(lofasz.id).then((res)=>{
                            lofasz.stops = res;
                            queryResult.push(lofasz);
                        });
                    }
                    setTimeout(()=>{
                        //console.log("getAllservices", queryResult);
                        this.serviceList = queryResult;
                        resolve(queryResult);
                    }, 1000);
                });
            });
    }

    /**
     *Az össes megállót visszaadja
     * @returns {Promise<Array<Stop>>}
     */
    getAllStopMagyarulMegallo(){
        return new Promise((resolve, reject)=>{
        let result = []
        this.db.query(TransportationDAO.QUERIES.getAllStopQuery, (err, res, next)=>{
            if (err) throw err;
            //console.log(this.className, 'Result of query: ', res);
            for(let s of res){
                result.push(new Stop(s['nev'], s["hely"]))
            }
            resolve(result);
        });
        });
    }

    createUser(user){
        return new Promise((resolve, reject)=>{
            if(!user instanceof User){
                console.error('Inavlid user!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createUserQuery, [user.email, user.password, user.zipCode, user.street, user.houseNumber, user.birthDate, user.firstName, user.lastName, user.passId, user.passId, user.isAdmin], (err, result) => {
                if(err){
                    throw(err);
                }
                console.log("Sikeres felhasználó létrehozás!");
                resolve(true);
            })
        })
    }

    updateUser(password, firstName, lastName, email){
        return new Promise((resolve, reject)=>{
            if(typeof password !== "string" || typeof firstName !== "string" || typeof lastName !== "string" || typeof email !== "string"){
                console.error('Invalid update user parameters!');
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateUserQuery, [password, firstName, lastName , email], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres felhasználó adatmódosítás!");
                resolve(true);
            });
        });
    }

    updateUserTicketIdentifier(identifier, email) {
        return new Promise((resolve, reject)=>{
            if(typeof identifier !== 'number' || typeof email !== 'string'){
                throw new Error('Inavlid identifier or email!');
            }
            this.db.query(TransportationDAO.QUERIES.updateUserTicketIdentifierQuery, [identifier, email], (err, result) => {
                if(err){
                    throw(err);
                }
                console.log("Sikeres jegyvásárlás!");
                resolve(true);
            })
        })
    }

    updateUserPassIdentifier(identifier, email) {
        return new Promise((resolve, reject)=>{
            if(!identifier instanceof 'number' || !email instanceof 'string'){
                console.error('Inavlid identifier or email!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateUserPassIdentifierQuery, [identifier, email], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres bérletvásárlás!");
                resolve(result);
            })
        })
    }

    deleteUser(email){
        return new Promise((resolve, reject)=>{
            if(!user instanceof User){
                console.error('Inavlid user!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteUserQuery, [email], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Felhasználó törölve!");
                resolve(result);
            })
        })
    }

    /**
     * Megkeresi az adott jelszóval rendelkező felhasználót
     * @param email
     * @returns {Promise<User | boolean>} False ha hiba van, a User más esetben
     */
    getUserByEmail(email){
        return new Promise((resolve, reject)=>{
            if(typeof email !=='string'){
                throw new Error(this.className + 'Invalid email address! ' + email);
            }
            this.db.query(TransportationDAO.QUERIES.getUserQuery, [email], (err, result, next)=>{
                if(err)throw(err);
                console.log('User got by email:', email, 'successfully', result);
                if(result[0] === undefined){
                    console.log("This user does not exist!")
                    resolve(false);
                    return false;
                }
                let res = result[0];
                //console.log("getuserbyemail", res);
                this.getTicketByIdentifier(res["jegyAzonosito"]).then(ticket=>{
                    //console.log(res);
                    resolve(new User(res['email'], res['jelszo'], res['iranyitoszam'], res['utca'], res['hazszam'], res['szuletesi_datum'], res['vezeteknev'], res['keresztnev'], ticket, res['berletAzonosito'], res['adminE']));
                });
            });
        })
    }

    /**
     * Gets all the users from the db
     * @returns {Promise<Array<User>>}
     */
    getAllUser(){
        return new Promise((resolve, reject)=>{
            this.db.query(TransportationDAO.QUERIES.getAllUserQuery, (err, result)=>{
                if(err)throw err;
                let results = [];
                for(let res of result){
                    results.push(new User(res['email'], res['jelszo'], res['iranyitoszam'], res['utca'], res['hazszam'], res['szuletesi_datum'], res['vezeteknev'], res['keresztnev'], res['JEGYID'], res['BERLETID'], res['adminE']));
                }
                resolve(results);
            })
        })
    }

    createService(serviceNumber, serviceType){
        return new Promise((resolve, reject)=>{
            if(typeof serviceNumber !== "string" || typeof serviceNumber){
                console.error('Inavlid service!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createServiceQuery, [serviceNumber, serviceType], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres járat létrehozás!");
                resolve(result);
            })
        })
    }

    updateService(service){
        return new Promise((resolve, reject)=>{
            if(!service instanceof Service){
                console.error('Inavlid service!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateServiceQuery, [service.serviceNumber, service.serviceType], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres adatmódosítás!");
                resolve(result);
            })
        })
    }

    deleteService(id){
        return new Promise((resolve, reject)=>{
            if(typeof  id !== "number"){
                console.error('Invalid Service!')
                reject(false);
            }
            this.serviceList = this.serviceList.filter(t=>t.id !== id);
            this.db.query(TransportationDAO.QUERIES.deleteServiceQuery, [id], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Járat törölve!");
                resolve(true);
            })
        })
    }

    getService(id){
        return new Promise((resolve, reject)=>{
            if(typeof id !=="number"){
                console.error('Invalid Service!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getServiceQuery, [id], (err, ser) => {
                if(err){
                    throw(err);
                }
                console.log("Járat visszaadva!");
                ser = ser[0];
                resolve(new Service(ser['ID'],ser['vonalszam'], ser['tipus']));
            })
        })
    }

    createTicket(ticket){
        return new Promise((resolve, reject)=>{
            if(!ticket instanceof Ticket){
                console.error('Inavlid ticket!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createTicketQuery, [ticket.identifier, ticket.price, ticket.type, ticket.validity, ticket.ID], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres jegy létrehozás!");
                resolve(result);
            })
        })
    }

    updateTicket(ticket){
        return new Promise((resolve, reject)=>{
            if(!ticket instanceof Ticket){
                console.error('Inavlid ticket!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateTicketQuery, [ticket.price, ticket.type, ticket.validtiy, ticket.ID], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres adatmódosítás!");
                resolve(result);
            })
        })
    }

    deleteTicket(identifier){
        return new Promise((resolve, reject)=>{
            if(typeof identifier !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteTicketQuery, [identifier], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Jegy törölve!");
                resolve(result);
            })
        })
    }

    getTicketByIdentifier(identifier){
        return new Promise((resolve, reject)=>{
            if(typeof identifier !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getTicketQuery,  [identifier], (err, res, next)=>{
                if(err)throw(err);
                console.log('Ticket got by identifier successfully');
                res = res[0];
                this.getService(res['ID']).then(service=>{
                    resolve(new Ticket(res['azonosito'], res['ar'], res['tipus'], (res['ervenyes']), service.id));
                }).catch(e=>console.log(e));
            });
        });
    }

    /**
     * Returns the ticket for the service
     * @param ID
     * @returns {Promise<Ticket>}
     */
    getTicketByServiceID(ID) {
        return new Promise((resolve, reject)=>{
            if(typeof ID !=="number"){
                throw new Error('Invalid serviceID: ' + ID);
            }
            this.db.query(TransportationDAO.QUERIES.getTicketByServiceIDQuery,  [ID], (err, res, next)=>{
                if(err)throw(err);
                console.log('Ticket got by Service ID successfully: ', res[0]);
                res = res[0];
                this.getService(ID).then(service=>{
                    console.log(this.className, 'getTicketByServiceID', service);
                    resolve(new Ticket(res['azonosito'], res['ar'], res['tipus'], (res['ervenyes']), service.serviceNumber));
                }).catch(e=>console.log(e));
            });
        });
    }

    createPass(pass){
        return new Promise((resolve, reject)=>{
            if(!pass instanceof Pass){
                console.error('Inavlid pass!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createPassQuery, [pass.identifier, pass.price, pass.type, pass.validity, pass.ID], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres bérlet létrehozás!");
                resolve(result);
            })
        })
    }

    updatePass(pass){
        return new Promise((resolve, reject)=>{
            if(!pass instanceof Pass){
                console.error('Inavlid pass!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updatePasQuery, [pass.price, pass.type, pass.validtiy, pass.ID], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres adatmódosítás!");
                resolve(result);
            })
        })
    }

    deletePass(identifier){
        return new Promise((resolve, reject)=>{
            if(typeof identifier !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deletePassQuery, [identifier], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Bérlet törölve!");
                resolve(result);
            })
        })
    }

    getPassByIdentifier(identifier){
        return new Promise((resolve, reject)=>{
            if(typeof identifier !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getPassQuery,  [identifier], (err, res, next)=>{
                if(err)reject(err);
                console.log('Pass got by identifier successfully');
                resolve(new Ticket(res['AZONOSITO'], res['AR'], res['TIPUS'], res['ERVENYES'], res['ID']));
            })
        })
    }

    createStop(stop){
        return new Promise((resolve, reject)=>{
            if(!stop instanceof Stop){
                console.error('Invalid Stop!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createStopQuery, [stop.name, stop.location], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres megálló létrehozás!");
                resolve(result);
            })
        })
    }

    updateStop(stop){
        return new Promise((resolve, reject)=>{
            if(!stop instanceof Stop){
                console.error('Invalid Stop!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateStopQuery, [stop.name, stop.location], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres megálló módosítás!");
                resolve(result);
            })
        })
    }

    deleteStop(name){
        return new Promise((resolve, reject)=>{
            if(typeof name === "string"){
                console.log("Invalid Stop!")
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteStopQuery, [name], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Megálló törölve!");
                resolve(result);
            })
        })
    }

    getStop(name){
        return new Promise((resolve, reject)=>{
            if(typeof name !== "string"){
                console.error('Invalid Stop!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getStopQuery, [name], (err, result) => {
                if(err){
                    reject(err);
                }
                //console.log("Megálló visszaadva!");
                //console.log(result);
                resolve(new Stop(result["nev"], result["hely"]));
            })
        })
    }

    /**
     * Returns the stops with timestamp for the given serviceid
     * @param id the id of the service
     * @returns {Promise<Array<Stop>>}
     */
    getStopping(id){
        return new Promise((resolve, reject)=>{
            if(typeof id !== "number"){
                console.error('Invalid Stopping!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getStoppingQuery, [id], (err, result) => {
                if(err){
                    throw err;
                }
                if(result.length <= 0){
                    console.error("Ez a járat nem üzemel (nincsenek megállói)!");
                }
                // console.log("Megáll visszaadva!");
                let stoppings = [];
                for(let res of result) {
                    stoppings.push(new Stop(res["nev"], res['hely'], res["mikor"]));
                }
                resolve(stoppings);
            })
        })
    }

    createNews(news){
        return new Promise((resolve, reject)=>{
            if(!news instanceof News){
                console.error('Inavlid news!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createNewsQuery, [news.title, news.category, news.description, news.publishDate()], (err, result) => {
                if(err){
                    reject(err);
                }
                    console.log("Sikeres hír létrehozás!");
                    resolve(result);
            });
        });
    }

    updateNews(news){
        return new Promise((resolve, reject)=>{
            if(!news instanceof News){
                console.error('Inavlid news!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateNewsQuery, [news.category, news.title, news.description, news.publishDate], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres adatmódosítás!");
                resolve(result);
            })
        })
    }

    deleteNews(ID){
        return new Promise((resolve, reject)=>{
            if(typeof ID !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteNewsQuery, [ID], (err, result) => {
                if(err){
                    reject(err);
                }
                if(result){
                    console.log("Hír törölve!", result);
                    resolve(result);
                }else{
                    reject(false);
                }
            })
        })
    }

    /**
     * Visszaadja az összes hírt
     * @returns {Promise<Array<News>>}
     */
    getNewsFoloslegesIdAlapjan(){
        return new Promise((resolve)=>{
            this.db.query(TransportationDAO.QUERIES.getNewsQuery, (err, faszomeredmeny, next)=>{
                if(err)throw(err);
                console.log('News got successfully');
                let result = [];
                for(let res of faszomeredmeny) {
                    result.push(new News(res['ID'], res['kategória'], res['cim'], res['leiras'], new Date(res['kozzetel_datum'])));
                }
                resolve(result);
            })
        });
    }

    createStopping(stopping){
        return new Promise((resolve, reject)=>{
            if(!stopping instanceof Stopping){
                console.error('Invalid Stopping!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createStoppingQuery, [stopping.id, stopping.name, stopping.when], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Megálló létrehozva!");
                resolve(result);
            })
        })
    }

    updateStopping(stopping){
        return new Promise((resolve, reject)=>{
            if(!stopping instanceof Stopping){
                console.error('Invalid Stopping!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateStoppingQuery, [stopping.id, stopping.name, stopping.when], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Megálló módosítva!");
                resolve(result);
            })
        })
    }

    deleteStopping(id, name){
        return new Promise((resolve, reject)=>{
            if(typeof id !== "number" || typeof name !== "string"){
                console.error('Invalid Stopping!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteStoppingQuery, [id, name], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Megálló törölve!");
                resolve(result);
            })
        })
    }


}

module.exports = TransportationDAO;