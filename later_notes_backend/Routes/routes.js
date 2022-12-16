const express = require("express");
const multer = require('multer');
const path = require("path");

const authToken = require("../middleware/authenticateToken")

const { Register, Login, ForgotPassword, getUser } = require("../Controller/user.js");
const { getUserDetail, addUserDetail, updateUserDetail } = require("../Controller/userDetails")
const { addNote, getAllNotes, getNoteById, updateNoteById, deleteNoteByNote, shareNotes } = require("../Controller/notes")
const { addSuggestions, getSuggestions, updateSuggestions } = require("../Controller/suggestions")
const { addComment, getComment, updateComment, deleteComment } = require("../Controller/comments")

const router = express.Router();

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

router.post('/register', Register);
router.post('/login', Login);
router.post('/forgotpassword', ForgotPassword);
router.get("/users", authToken, getUser)

router.get('/userDetails', authToken, getUserDetail)
router.post('/userDetails', upload.single('photo'), authToken, addUserDetail)
router.put("/userDetails", upload.single('photo'), authToken, updateUserDetail)

router.post("/dashboard", authToken, addNote)
router.get("/MyNotes", authToken, getAllNotes)
router.get("/MyNotes/:id", authToken, getNoteById)
router.put("/MyNotes/:id", authToken, updateNoteById)
router.delete("/MyNotes/:id", authToken, deleteNoteByNote)
router.post("/sharedNote/:id", authToken, shareNotes)

router.get("/suggestion/:id", getSuggestions)
router.post("/suggestion", addSuggestions)
router.put("/suggestion/:id", updateSuggestions)

router.get("/comment/:threadId", getComment)
router.post("/comment", addComment)
router.put("/comment/:commentId/:threadId", updateComment)
router.delete("/comment/:commentId/:threadId", deleteComment)

module.exports = router;