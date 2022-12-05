const Service = require("./Service");
const {TIME} = require("mysql/lib/protocol/constants/types");

class Ticket{ //JEGY
    identifier;      //azonosito
    price;   //ar
    type; //tipus
    validity;   //ervenyes
    serviceTheTicketIsFor;     //JARAT.jaratszam

    constructor(identifier = 0, price = 0, type = "", validity = '', serviceTheTicketIsFor=0) {
        this.identifier = identifier;
        this.price = price;
        this.type = type;
        this.validity = validity;
        this.serviceTheTicketIsFor = serviceTheTicketIsFor;
    }
}

module.exports = Ticket;