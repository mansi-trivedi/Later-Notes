const sql = require("mssql")

async function spInput(parameters){  
    let allParameters = []
    for (const item in parameters){
        let Inputvalue = [item, sql.NVarChar, String(parameters[item])]
        allParameters.push(Inputvalue)
        }
    return allParameters
}

module.exports = spInput