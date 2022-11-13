const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function getUserDetails(user){  
    let allParameters = []
    for (const item in user){
        let Inputvalue = [item, sql.NVarChar, user[item]]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.getUserDetail, allParameters)
}

module.exports = getUserDetails