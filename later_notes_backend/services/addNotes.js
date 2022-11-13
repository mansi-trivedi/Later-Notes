const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function addNote(notes){  
    let allParameters = []
    for (const item in notes){
        let Inputvalue = [item, sql.NVarChar, notes[item]]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.addNotes, allParameters)
}

module.exports = addNote