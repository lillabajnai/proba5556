const DAO = require ('../TransportationDAO');
const dataAccessObjectObject = new DAO();

/**
 * Initializes the data in the database
 * Only carefully!
 * Do not run alongside index.jsx
 */
function init(){

    //dataAccessObjectObject.__query("DELETE FROM HIRFOLYAM WHERE ID = 1").then(res=>{
        dataAccessObjectObject.__query("INSERT INTO HIRFOLYAM  VALUES" +
            "(2, 'Kígyózó kígyók', 'Kedves Ferenc barát szerint a kígyók kígyóznak', 'Egy bizonyos Ferenc így nyilatkozott, amikor megkérdezték tőle a tudósítóink, mi a vélaménye a szegedi villamoshálózatról.', '2022-02-27'), " +
            "(3, 'Egyetem', 'Az SZKT kedvezményes bérletet biztosít az SZTE diákjainak', 'Kedvezményes, majdnem 150%-os kedvezményt bizosítanak a diákoknak akkor és csak akkor ha legalább 7,9-es átlagot produkálnak az utolsó két félév összesítettje alapján.', '2022-02-27')"
        ).then(res=>{
            console.log(res);
        }).catch(e=>{console.error(e)});
    //}).catch(e=>console.log(e));
}

function getData(){
    dataAccessObjectObject.__query("SELECT * FROM HIRFOLYAM").then(res=>console.log(res)).catch(e=>console.error(e));
}

init();
//getData();