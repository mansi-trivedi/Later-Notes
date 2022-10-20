const express = require("express")
const cors = require("cors")
const JWT = require("jsonwebtoken");
const multer = require('multer');
const bodyParser = require('body-parser');

const register = require("./userData/register")
const login = require("./userData/login")
const forgotPassword = require("./userData/forgotPassword")

require("dotenv").config();


const app = express()
const port = process.env.PORT || 3001;

app.use(express.static("./public"))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 // handle storage using multer
// var storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//       callBack(null, './public/images/')     // directory name where save the file
//   },
//   filename: (req, file, callBack) => {
//       callBack(null, Date.now() + '-' + file.originalname)
//   }
// })

// var upload = multer({
//   storage: storage
// })

app.post("/register", async(req, res)=> {  // upload.single('imageFile'),
  try{
    // if (!req.file) {
    //   console.log("No file upload");
    // } else {
    //   console.log(req.file)
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
    const email = loginUserData.email
    const response = await login(loginUserData)
        
    // Send JWT access token
    const accessToken = await JWT.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1m",
        }
    );

    // Refresh token
    const refreshToken = await JWT.sign(
      { email },
      process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "5m",
        }
    );

    //Set refersh token in refreshTokens array
    refreshTokens.push(refreshToken);
    res.status(200).send({message: "login Successfully", accessToken, refreshToken, user: response.recordset})
  }
  catch(error){
    console.log(error)
    res.status(400).send({error: error.message})
  }
})

let refreshTokens = [];

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


// Create new access token from refresh token
app.post("/token", async (req, res) => {
    const refreshToken = req.header("x-auth-token");
  
    // If token is not provided, send error message
    if (!refreshToken) {
      res.status(401).send({
        errors: [
          {
            msg: "Token not found",
          },
        ],
      });
    }
  
    // If token does not exist, send error message
    if (!refreshTokens.includes(refreshToken)) {
      res.status(403).send({
        errors: [
          {
            msg: "Invalid refresh token",
          },
        ],
      });
    }
  
    try {
      const user = await JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      
     const { email } = user;
     const accessToken = await JWT.sign(
       { email },
       process.env.ACCESS_TOKEN_SECRET,
       { expiresIn: "1m" }
     );
     res.json({ accessToken });
   } 
   catch (error) {
     res.status(403).json({
       errors: [
         {
           msg: "Invalid token",
         },
       ],
     });
   }
 });

 // Deauthenticate - log out
 // Delete refresh token
app.delete("/logout", (req, res) => {
    const refreshToken = req.header("x-auth-token");
  
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.sendStatus(204);
  });
  

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});















































