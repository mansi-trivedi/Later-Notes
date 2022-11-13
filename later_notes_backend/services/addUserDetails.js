const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function addUserDetails(user){  
    let allParameters = []
    for (const item in user){
        let Inputvalue = [item, sql.NVarChar, user[item]]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.addUserDetail, allParameters)
}

module.exports = addUserDetails