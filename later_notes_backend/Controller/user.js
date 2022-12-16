const JWT = require("jsonwebtoken");

const authToken = require("../middleware/authenticateToken")
const executeStoredProcedure = require("../Database/executeStoredProcedure")
const spParameter = require("../services/spInput")
const constant = require("../Constants/constant")

const RegisterUser = require("../Model/registerUser")

const Register = async (req, res) => {
  try {
    let registerUserData = req.body
    const registerUser = new RegisterUser(registerUserData)
    const spInput = await spParameter(registerUser)
    const response = await executeStoredProcedure(constant.register, spInput)
    res.status(200).send({ message: "Registered Successfully" })
  }
  catch (error) {
    console.log(error)
    res.status(400).send({ error: error.message })
  }
}

const Login = async (req, res) => {
  try {
    const loginUserData = req.body
    const spInput = await spParameter(loginUserData)
    const response = await executeStoredProcedure(constant.login, spInput)
    const accessToken = await JWT.sign(
      {
        userId: response.recordset[0].id
      },
      process.env.ACCESS_TOKEN_SECRET,
    );
    res.status(200).json({ message: "login Successfully", token: accessToken, user: response.recordset[0] })
  }
  catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

const ForgotPassword = async (req, res) => {
  try {
    const forgotPasswordUserData = req.body
    const spInput = await spParameter(forgotPasswordUserData)
    const response = await executeStoredProcedure(constant.forgotPassword, spInput)
    res.status(200).send({ message: "Password Changed Successfully" })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    const owner = {
      ownerId: req.userId
    }
    const spInput = await spParameter(owner)
    const response = await executeStoredProcedure(constant.users, spInput)
    res.status(200).send({ data: response.recordset })
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = { Register, Login, ForgotPassword, getUser }