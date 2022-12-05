class News{ //HIRFOLYAM
    ID; //ID
    category; //kategoria
    title; //cim
    description; //leiras
    _publishDate; //kozzetel_datum

    constructor(ID = 0, category = "", title = "", description = "", publishDate = new Date()) {
        this.ID = ID;
        this.category = category;
        this.title = title;
        this.description = description;
        this._publishDate = publishDate;
    }

    publishDate(){
        let isoString = this._publishDate.toISOString();
        return isoString.split('T')[0]
    }
}

module.exports = News;