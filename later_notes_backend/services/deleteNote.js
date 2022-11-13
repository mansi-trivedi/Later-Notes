const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function deleteNoteId(note){  
    let allParameters = []
    for (const item in note){
        let Inputvalue = [item, sql.NVarChar, note[item]]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.deleteById, allParameters)
}

module.exports = deleteNoteId