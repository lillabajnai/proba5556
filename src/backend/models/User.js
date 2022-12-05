const Ticket = require("./Ticket");
const Pass = require("./Pass");

class User{     // Adatbázis mező nevek
    email;      //email
    password;   //jelszo
    zipCode;   //iranyitoszam
    street;     //utca
    houseNumber;    //hazszam
    birthDate;  //szuletesi_datum
    firstName;  //vezeteknev
    lastName;   //keresztnev
    ticket;   //JEGY
    passId;     //BERLET.azonosito
    isAdmin;    //adminE

    constructor(email = "", password = "", zipCode = 0, street="", houseNumber= 0, birthDate = new Date(), firstName="", lastName="", ticket = new Ticket(), passId = 999, isAdmin= false) {
        this.email = email;
        this.password = password;
        this.zipCode = zipCode;
        this.street = street;
        this.houseNumber = houseNumber;
        this.birthDate = birthDate;
        this.firstName = firstName;
        this.lastName = lastName;
        this.ticket = ticket;
        this.passId = passId;
        this.isAdmin = isAdmin;
    }
}

module.exports = User;