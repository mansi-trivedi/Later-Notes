const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function updateUserDetail(note){  
    let allParameters = []
    for (const item in note){
        let Inputvalue = [item, sql.NVarChar, note[item]]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.updateUserDetail, allParameters)
}

module.exports = updateUserDetail