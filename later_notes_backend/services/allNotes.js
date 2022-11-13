const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function allNote(owner){  
    let allParameters = []
    for (const item in owner){
        let Inputvalue = [item, sql.NVarChar, owner[item]]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.allNotes, allParameters)
}

module.exports = allNote