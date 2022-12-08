const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function updateComments(comment){  
    let allParameters = []
    for (const item in comment){
        let Inputvalue = [item, sql.NVarChar, String(comment[item])]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.updateComments, allParameters)
}

module.exports = updateComments