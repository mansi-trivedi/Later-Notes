const sql = require("mssql")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const constant = require("../Constants/constant")

async function forgotPassword(registeredUserData){  
    let allParameters = []
    for (const item in registeredUserData){
        let Inputvalue = [item, sql.NVarChar, registeredUserData[item]]
        allParameters.push(Inputvalue)
        }
    return executeStoredProcedure(constant.forgotPassword, allParameters)
}

module.exports = forgotPassword