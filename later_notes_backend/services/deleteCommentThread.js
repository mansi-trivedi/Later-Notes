const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function deleteCommentThread(comment){  
    let allParameters = []
    for (const item in comment){
        let Inputvalue = [item, sql.NVarChar, comment[item]]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.deleteCommentThread, allParameters)
}

module.exports = deleteCommentThread