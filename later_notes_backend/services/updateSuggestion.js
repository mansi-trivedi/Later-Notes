const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function updateSuggestions(suggestion){  
    let allParameters = []
    for (const item in suggestion){
        let Inputvalue = [item, sql.NVarChar, String(suggestion[item])]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.updateSuggestion, allParameters)
}

module.exports = updateSuggestions