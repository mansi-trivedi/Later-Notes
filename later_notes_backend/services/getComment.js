const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function getComments(suggestion){  
    let allParameters = []
    for (const item in suggestion){
        let Inputvalue = [item, sql.NVarChar, suggestion[item]]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.getComments, allParameters)
}

module.exports = getComments