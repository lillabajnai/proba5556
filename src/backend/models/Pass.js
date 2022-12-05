const Service = require("./Service");

class Pass{ //BERLET
    identifier;      //azonosito
    price;   //ar
    type; //tipus 
    validity;   //ervenyes
    ID;     //JARAT.ID

    constructor(identifier = 0, price = 0, type = "", validity = new Date(), ID=0) {
        this.identifier = identifier;
        this.price = price;
        this.type = type;
        this.validity = validity;
        this.ID = ID;
    }
}

module.exports = Pass;