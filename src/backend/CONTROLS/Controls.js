const DAO = require('../DAO/TransportationDAO');
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Stop = require('../models/Stop');
const Service = require("../models/Service");
const Stopping = require('../models/Stopping');
const News = require('../models/News');

class Controls{
    constructor() {
        this.className = 'CONTROLS => ';
        this.DAO = new DAO();
        this.activeUser = new User();
    }

    // TODO: Jegyek, bérletek kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Jegyek, bérletek árának módosítása, bejelentkezett felhasználó ellenörzése

    /***
     * A bejelentkezett felhasználó jegyét visszaadja
     * @returns {Ticket | boolean}
     */
    getTicketForLoggedInUser(){
        if(this.activeUser) {
            return this.activeUser.ticket;
        }else{
            console.error('No active user!');
            return false;
        }
    }

    // TODO: MEGADOTT AZONOSÍTÓJÚ JEGY ÁRÁNAK ÉS/VAGY TÍPUSÁNAK MÓDOSÍTÁSA (CSAK ADMIN)
    // TODO: MEGADOTT AZONOSÍTÓJÚ JEGY TÖRLÉSE (CSAK ADMIN)

    // TODO: Jegyek bérletek vásárlása logika
    // Vásárlás: Form kitöltése után jegy feltöltése az adatbázisba + jegy hozzárendelése a bejelentkezett  felhasználóhoz ezt hozzáadni



    // TODO: Hírfolyam kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Hírfolyam adatainak lekérése az adatbázisból és a hírfolyamra való felíratkozás kezelése

    /**
     * Megkapod a híreket
     * @returns {Promise<Array<News>>}
     */
    async getNews(){
        return await this.DAO.getNewsFoloslegesIdAlapjan().then(res=>{
            //console.log(this.className, res);
            return res;
        }).catch(e=>console.error(e));
    }

    createNews(category, title, description, publishDate){
        const news = new News(0, category, title, description, publishDate)
        return this.DAO.createNews(news).then(res=>{
            console.log("createNews control", res);
            news.ID = res.insertId;
            return news;
        }).catch(e=>console.log("createNews control error", e));
    }

    deleteNews(ID){
        return this.DAO.deleteNews(ID).then(res=>{
           console.log("deleteNews control", res);
           return res;
        }).catch(e=>console.error(e));
    }

    // TODO: Vásárlások kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Random bankártya adatok bekérése, nincs mentés

    /***
     * A bejelentkezett usernek vesz egy jegyet a megadott id-jú járatra
     * @param jaratID
     * @returns {boolean}
     */
    async ticketPurchaseHandler(jaratID){
        if(typeof jaratID !== "number"){
            console.error("Nem megfelelő az email vagy járat ID!");
            return false;
        }
        let ticketIdentifier;
        // Megkapja a járat ID-jét, amiből lekérdezi a jegy azonsoítóját
        return await this.DAO.getTicketByServiceID(jaratID).then((result) => {
            console.log('CONTOLS: ', result);
            ticketIdentifier = result.identifier;
            // Megkapja az új jegyet
            this.activeUser.ticket = result;
            console.log('Ticket to buy id: ', ticketIdentifier);
            return this.DAO.updateUserTicketIdentifier(ticketIdentifier, this.activeUser.email).then((result) => {
                if(result) {
                    console.log('User ticket successfully updated.');
                    return true;
                }else{
                    return false;
                }
            }).catch(e=>console.error(e));
        }).catch(e=>console.error(e));
    }


    // TODO: Menetrendek kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Admin felhasználó módosíthatja az adott járatokat, törölhet járatot

    //result.insertID
    createService(serviceNumber, serviceType, stops){
        return this.DAO.createService(serviceNumber, serviceType).then(res=>{
            let service = new Service(res.insertId, serviceNumber, serviceType, []);
            for(let i in stops){
                this.DAO.getStop(i.name).then(res=>{
                    service.stops.push(res);
                });
                let stopping = new Stopping(res.insertId, i.name, i.arrivalTime);
                this.DAO.createStopping(stopping).then(res=>{
                    console.log("createStopping control", res);
                }).catch(e=>console.error(e));
            }
            this.DAO.serviceList.push(service);
        }).catch(e=>console.error(e));
    }

    selectAllServiceList(){
        if(this.DAO.serviceList.length > 0){
            return this.DAO.serviceList;
        }
        return this.DAO.getAllServiceMagyarulJarat().then(res=>{
           if(res.length > 0){
               return res;
           } else{
               return [];
           }
        });
    }
    async deleteService(id){
        return await this.DAO.deleteService(id).then(res=>{
            console.log("deleteService", res);
            if(res){
                return true;
            }
        }).catch(e=>{
            console.log(e);
            return false;
        });
    }

    async selectBuses(){
        if(this.DAO.serviceList.length > 0){
            let result = [];
            for(let r of this.DAO.serviceList){
                if(r.serviceType === 'BUSZ'){
                    result.push(r);
                }
            }
            return result;
        }
        return await this.DAO.getAllServiceMagyarulJarat().then(res=>{
            let result = [];
            for(let r of res){
                if(r.serviceType === 'BUSZ'){
                    result.push(r);
                }
            }
            return result;
        });
    }


    async selectTrams(){
        if(this.DAO.serviceList.length > 0){
            let result = [];
            for(let r of this.DAO.serviceList){
                if(r.serviceType === 'VILL'){
                    result.push(r);
                }
            }
            return result;
        }
        return await this.DAO.getAllServiceMagyarulJarat().then(res=>{
            let resolvetomb = [];
            // console.log("selectTrams",res);
            for (let i of res){
                if(i.serviceType === "VILL"){
                    resolvetomb.push(i);
                }
            }
            return resolvetomb;
        });
    }

    async selectTrolleyBuses(){
        if(this.DAO.serviceList.length > 0){
            let result = [];
            for(let r of this.DAO.serviceList){
                if(r.serviceType === 'TROL'){
                    result.push(r);
                }
            }
            return result;
        }
        return await this.DAO.getAllServiceMagyarulJarat().then(res=>{
            let resolvetomb = [];
            // console.log("selectTrams",res);
            for (let i of res){
                if(i.serviceType === "TROL"){
                    resolvetomb.push(i);
                }
            }
            return resolvetomb;
        });
    }


    // TODO: Felhasználói munkamenet logikája több jogosultsági szinttel (admin, vendég, általános felhasználó)
    // Bejelentkezés, regisztráció és kijelentkezés

    // Ez már hazsnálható a felhasználó bejelentkeztetéséhez
    /**
     * Bejelentkezik a megadott adatokkal, hamissal tér vissza ha sikertelen
     * @param email
     * @param password
     * @returns {boolean | Promise}
     */
    async loginByEmailAndPassword(email, password){
        if(typeof email !== "string" || typeof password !== "string"){
            console.error('Controls.loginByEmailAndPassword => ', 'Invalid argument(s)!', email, password);
            return false;
        }
        return await this.DAO.getUserByEmail(email).then(res=>{
            console.log("loginbyemail", res);
            if(res === false){
                console.log("user is not found!");
                return false;
            }
            else{
                this.activeUser = res;
                //console.log(this.activeUser);
                return res;
            }
        }).catch(e=>console.error(e));
    }

    async updateUser(password, firstName, lastName, email){
        return await this.DAO.updateUser(password, firstName, lastName, email).then(res=>{
            console.log("updateuser", res);
            if(res){
                this.activeUser.password = password;
                this.activeUser.firstName = firstName;
                this.activeUser.lastName = lastName;
                this.activeUser.email = email;
                return true;
            }
        }).catch(e=> {
            console.error(e)
            return false});
    }


    getUsers(){
        return this.DAO.getAllUser().then(res=>{
            return res;
        });
    }

    getStops(){
        return this.DAO.getAllStopMagyarulMegallo().then(res=>{
           return res;
        });
    }

    /**
     * Is the email in use?
     * @param email
     * @returns {Promise<boolean>}
     */
    async canRegisterUser(email){
        return await this.DAO.getUserByEmail(email).then(res=>{
            return !(res instanceof User);
        }).catch(e=>{
            console.error(e);
        });
    }

    async registerUser(email, password, firstName, lastName, zipCode, street, house, birthDate){
        let user = new User(email, password, zipCode, street, house, birthDate, firstName, lastName);
        console.log("async register user method", user);
        return await this.DAO.createUser(user).then(res=>{
            console.log("create user dao method", res)
            return res;
        }).catch(e=>console.error(e));
    }
}

module.exports = Controls;