class Service{
    id; //ID
    serviceNumber; //vonalszam
    serviceType; //tipus
    stops;

    constructor(id = 0, serviceNumber = "", serviceType = "", stops=[]) {
        this.id = id;
        this.serviceNumber = serviceNumber;
        this.serviceType = serviceType;
        this.stops = stops;
    }
}

module.exports = Service;