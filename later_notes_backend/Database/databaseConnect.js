
const sql = require("mssql");

async function databaseConnect(){
    const config = {        //database Configuration file
        server : "localhost",
        database : 'demo',
        user : "mansi",
        password : "mansi123", 
        port : 1433,
        options:{
            trustedconnection: true,
            trustServerCertificate: true,
            enableArithAbort : true
        }
    };
    
   let connection = await sql.connect(config);
   return connection
}


module.exports = {databaseConnect}