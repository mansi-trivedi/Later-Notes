const express = require("express")
const cors = require("cors")
const JWT = require("jsonwebtoken");
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require("path");

const authToken = require("./middleware/authenticateToken")
const executeStoredProcedure = require("./Database/executeStoredProcedure")

const RegisterUser = require("./Model/user")
const RegisterUserNotes = require("./Model/note")
const RegisterUserDetails = require("./Model/userDetails")

const constant = require("./Constants/constant")

const register = require("./services/register")
const login = require("./services/login")
const forgotPassword = require("./services/forgotPassword")
const addNote = require("./services/addNotes")
const allNote = require("./services/allNotes");
const noteId = require("./services/noteId")
const deleteNoteId = require("./services/deleteNote")
const updateNoteId = require("./services/updateNote")
const addUserDetails = require("./services/addUserDetails")
const getUserDetails = require("./services/getUserDetails")
const updateUserDetail = require("./services/updateUserDetails")


require("dotenv").config();

const app = express()
const port = process.env.PORT || 3001;

app.use('/public', express.static('public'));
app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + path.extname(file.originalname))
  }
});

var upload = multer({
  storage: storage,
});

app.post("/register", async (req, res) => {
  try {
    let registerUserData = req.body
    const registerUser = new RegisterUser(registerUserData)
    const response = await register(registerUser)
    res.status(200).send({ message: "Registered Successfully" })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.post("/login", async (req, res) => {
  try {
    const loginUserData = req.body
    const response = await login(loginUserData)

    // Send JWT access token
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
})

app.post("/forgotpassword", async (req, res) => {
  try {
    const forgotPasswordUserData = req.body
    const response = await forgotPassword(forgotPasswordUserData)
    res.status(200).send({ message: "Password Changed Successfully" })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.post("/dashboard", authToken, async (req, res) => {
  try {
    const UserNotes = new RegisterUserNotes({
      ...req.body,
      ownerId: req.userId
    })
    const response = await addNote(UserNotes)
    res.status(200).send({ message: "Note Added Successfully" })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.post("/userDetails", upload.single('photo'), authToken, async (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host')
    const userDetail = new RegisterUserDetails({
      ...req.body,
      photo: url + '/public/' + req.file.filename,
      ownerId: req.userId
    })
    const response = await addUserDetails(userDetail)
    res.status(200).send({ message: "User Details Added Successfully", data: response.recordset[0] })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.put("/userDetails", upload.single('photo'), authToken, async (req, res) => {
  try {
    if (req.file != undefined) {
      console.log("if")
      const url = req.protocol + '://' + req.get('host')
      const userDetail = new RegisterUserDetails({
        ...req.body,
        photo: url + '/public/' + req.file.filename,
        ownerId: req.userId
      })
      const response = await  updateUserDetail(userDetail)
      res.status(200).send({ message: "User Details updated Successfully", data: response.recordset[0] })
    } else {
      const userDetail = new RegisterUserDetails({
        ...req.body,
        ownerId: req.userId
      })
      const response = await  updateUserDetail(userDetail)
      res.status(200).send({ message: "User Details updated Successfully", data: response.recordset[0] })
    }
  }
  catch (error) {
    console.log(error)
    res.status(400).send({ error: error.message })
  }
})

app.get("/userDetails", authToken, async (req, res) => {
  try {
    const userDetail = {
      ownerId: req.userId
    }
    const response = await getUserDetails(userDetail)
    res.status(200).send({ data: response.recordset })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.get("/MyNotes", authToken, async (req, res) => {
  try {
    const owner = {
      OwnerId: req.userId
    }
    const response = await allNote(owner)
    res.status(200).send({ data: response.recordset })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.get("/MyNotes/:id", authToken, async (req, res) => {
  try {
    const note = {
      OwnerId: req.userId,
      noteId: req.params.id
    }
    const response = await noteId(note)
    res.status(200).send({ data: response.recordset })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
});

app.put("/MyNotes/:id", authToken, async (req, res) => {
  try {
    const note = {
      ...req.body,
      OwnerId: req.userId,
      noteId: req.params.id
    }
    const response = await updateNoteId(note)
    res.status(200).send({ message: "Note updated Successfully" })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
});

app.delete("/MyNotes/:id", authToken, async (req, res) => {
  try {
    const note = {
      OwnerId: req.userId,
      noteId: req.params.id
    }
    const response = await deleteNoteId(note)
    res.status(200).send({ message: "Note deleted Successfully" })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
});

app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});


















































