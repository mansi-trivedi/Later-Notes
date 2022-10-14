const express = require("express")
const cors = require("cors")
const register = require("./userData/register")
const login = require("./userData/login")
const forgotPassword = require("./userData/forgotPassword")


const app = express()
const port = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

app.post("/register", async(req, res)=> {
    try{
        const registerUserData = req.body
        const response = await register(registerUserData)
        res.status(200).send({message: "Registered Successfully"})
    }
    catch(error){
        res.status(400).send({error: error.message})
    }
})

app.post("/login", async(req, res)=> {
    try{
        const loginUserData = req.body
        const response = await login(loginUserData)
        res.status(200).send({message: "login Successfully", user: response.recordset})
    }
    catch(error){
        res.status(400).send({error: error.message})
    }
})

app.post("/forgotpassword", async(req, res)=> {
    try{
        const forgotPasswordUserData = req.body
        const response = await forgotPassword(forgotPasswordUserData)
        res.status(200).send({message: "Password Changed Successfully"})
    }
    catch(error){
        res.status(400).send({error: error.message})
    }
})



app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});
















































/*app.post("/register", (req, res)=> {
    const { username, email, password} = req.body
//     var sqlInsert = `INSERT INTO UserRegistration values('${username}', '${email}', '${password}')`
//     // var userFound = `SELECT * FROM UserRegistration WHERE email = '${email}' AND password = '${password}' AND username='${username}'`
    
//     // db.query(userFound, function(err, result) {
//     //     if (err){
//     //         res.send({error: err})
//     //     } 
//     //     if(result.recordset.length != 0){
//     //         res.send({message: "User Already exists"})
//     //     }
//     //     else{
//             db.query(sqlInsert, function(err, result) {
//                 if (err){
//                     res.status(400).send({error: err})
//                  } 
//                 else{
//                     res.status(201).send({message: "registered Successfully"})
//                 }
//             })
//         // }
//     });
});

app.post("/login", (req, res)=> {
    const { email, password} = req.body
    var sql = `SELECT * FROM UserRegistration WHERE email = '${email}' AND password = '${password}'`
    db.query(sql, function(err, result) {
        if (err){
            console.log(err)
            res.send({error: err})
        } 

        else{//(result.recordset !=0){
            console.log(result)
            res.send({message: "login Successfully"})
        }
        // else{
        //     console.log("invalid")
        //     res.status(404).send({error: "Invalid email or password"})
        // }
   });
})*/


/*app.post("/forgotpassword", (req, res)=> {
    const { email, password, ConfirmPassword} = req.body
    var sql = `UPDATE UserRegistration SET password = '${password}' WHERE email ='${email}'`
    db.query(sql, function(err, result) {
        if (err){
           res.status(404).send({error: err})
        } 
        else{
            console.log(result)
            res.send({message: "password changed"})
        }
   });
})*/


