const Service = require("./Service");
const Stop = require("./Stop");

class Stopping {
    id; // JARAT.ID
    name;  //MEGALLO.nev
    when; //mikor
    
  constructor(id = 0, name = "", when = "") {
    this.id = id;
    this.name = name;
    this.when = when;
  }
}

module.exports = Stopping;