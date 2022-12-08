const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function deleteComment(comment){  
    let allParameters = []
    for (const item in comment){
        let Inputvalue = [item, sql.NVarChar, comment[item]]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.deleteComments, allParameters)
}

module.exports = deleteComment