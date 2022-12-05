const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const { connect } = require('net');

const config =
{
    host: 'mydemoserver556.mysql.database.azure.com',
    user: 'lilla',
    password: 'szteOverrated100',
    database: 'rf1',
    port: 3306,
    ssl: {ca: fs.readFileSync(path.join(__dirname + "/DigiCertGlobalRootCA.crt.pem"))}
};

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) {
    if (err) {
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");
           queryDatabase();
    }
});

function queryDatabase(){
  conn.query('USE RF1;', function (err, results, fields) {
    if (err) throw err;
    console.log('Using DB RF1.');
  })
/*
    conn.query('INSERT INTO MEGALLO VALUES("villamosmegálló", "Európa liget"), ("villamosmegálló", "Szeged vasútállomás"), ("buszmegálló", "Makkosház"), ("buszmegálló", "Klinikák");',
          function (err, results, fields) {
              if (err) throw err;
      console.log('Inserted into MEGALLO table.');
    })

    conn.query('INSERT INTO JARAT VALUES(2, "VILL", "Európa liget", "Szeged vasútállomás", "03:55:00", "04:14:00");',
          function (err, results, fields) {
              if (err) throw err;
      console.log('Inserted into JARAT table.');
    })

    conn.query('INSERT INTO JARAT VALUES(19, "BUSZ", "Makkosház", "Klinikák", "19:55:00", "20:35:00");',
        function (err, results, fields) {
            if (err) throw err;
            console.log('Inserted into JARAT table.');
        })

    conn.query('INSERT INTO JARAT VALUES(2, "VILL", "Szeged vasútállomás", "Európa liget", "04:55:00", "06:14:00");',
        function (err, results, fields) {
            if (err) throw err;
            console.log('Inserted into JARAT table.');
        })

    conn.query('INSERT INTO JARAT VALUES(5, "BUSZ", "Makkosház", "Szeged vasútállomás", "09:55:00", "010:35:00");',
        function (err, results, fields) {
            if (err) throw err;
            console.log('Inserted into JARAT table.');
        })
}*/}

module.exports = conn;