const connection = require("./databaseConnect");
const sql = require("mssql");

async function executeStoredProcedure(spName, parameters){
    
    let pool = await connection.databaseConnect()
    let request = pool.request()

    if(parameters == undefined || parameters == null){
        return request.execute(spName);
    }
    else{
        parameters.forEach(elementContainingInfo => {
            let [name,dtype,value] = elementContainingInfo;
            request.input(name,dtype,value)
        });

    return request.execute(spName)
    }
}

module.exports = executeStoredProcedure
