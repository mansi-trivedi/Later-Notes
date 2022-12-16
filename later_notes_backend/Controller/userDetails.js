const RegisterUserDetails = require("../Model/userDetails")

const executeStoredProcedure = require("../Database/executeStoredProcedure")
const spParameter = require("../services/spInput")
const constant = require("../Constants/constant")

const getUserDetail = async (req, res) => {
  try {
    const userDetail = {
      ownerId: req.userId
    }
    const spInput = await spParameter(userDetail)
    const response = await executeStoredProcedure(constant.getUserDetail, spInput)
    res.status(200).send({ data: response.recordset })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const addUserDetail = async (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host')
    const userDetail = new RegisterUserDetails({
      ...req.body,
      photo: url + '/public/' + req.file.filename,
      ownerId: req.userId
    })
    const spInput = await spParameter(userDetail)
    const response = await executeStoredProcedure(constant.addUserDetail, spInput)
    res.status(200).send({ message: "User Details Added Successfully", data: response.recordset[0] })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const updateUserDetail = async (req, res) => {
  try {
    if (req.file != undefined) {
      console.log("if")
      const url = req.protocol + '://' + req.get('host')
      const userDetail = new RegisterUserDetails({
        ...req.body,
        photo: url + '/public/' + req.file.filename,
        ownerId: req.userId
      })
      const spInput = await spParameter(userDetail)
      const response = await executeStoredProcedure(constant.updateUserDetail, spInput)
      res.status(200).send({ message: "User Details updated Successfully", data: response.recordset[0] })
    } else {
      const userDetail = new RegisterUserDetails({
        ...req.body,
        ownerId: req.userId
      })
      const spInput = await spParameter(userDetail)
      const response = executeStoredProcedure(constant.updateUserDetail, spInput)
      res.status(200).send({ message: "User Details updated Successfully", data: response.recordset[0] })
    }
  }
  catch (error) {
    console.log(error)
    res.status(400).send({ error: error.message })
  }
}

module.exports = { addUserDetail, getUserDetail, updateUserDetail }