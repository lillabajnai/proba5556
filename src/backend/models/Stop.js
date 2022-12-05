class Stop {
    name;  //nev
    location; //hely
    arrivalTime; // mikor
    
  constructor(name = "", location = "", when= new Date()) {
    this.name = name;
    this.location = [Number(location.split(',')[0].trim()), Number(location.split(',')[1].trim())];
    this.arrivalTime = when;
  }
}

module.exports = Stop;