const RegisterUserNotes = require("../Model/note")

const executeStoredProcedure = require("../Database/executeStoredProcedure")
const spParameter = require("../services/spInput")
const constant = require("../Constants/constant")

const addNote = async (req, res) => {
  try {
    const UserNotes = new RegisterUserNotes({
      ...req.body,
      ownerId: req.userId
    })
    const spInput = await spParameter(UserNotes)
    const response = await executeStoredProcedure(constant.addNotes, spInput)
    res.status(200).send({ message: "Note Added Successfully" })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const getAllNotes = async (req, res) => {
  try {
    const owner = {
      OwnerId: req.userId
    }
    const spInput = await spParameter(owner)
    const response = await executeStoredProcedure(constant.allNotes, spInput)
    res.status(200).send({ data: response.recordset })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const getNoteById = async (req, res) => {
  try {
    const note = {
      OwnerId: req.userId,
      noteId: req.params.id
    }
    const spInput = await spParameter(note)
    const response = await executeStoredProcedure(constant.noteId, spInput)
    res.status(200).send({ data: response.recordset })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
};

const updateNoteById = async (req, res) => {
  try {
    const note = {
      ...req.body,
      noteId: req.params.id
    }
    const spInput = await spParameter(note)
    const response = await executeStoredProcedure(constant.updateById, spInput)
    res.status(200).send({ message: "Note updated Successfully" })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const deleteNoteByNote = async (req, res) => {
  try {
    const note = {
      noteId: req.params.id
    }
    const spInput = await spParameter(note)
    const response1 = await executeStoredProcedure(constant.noteOwner, spInput)
    if (response1.recordset[0].ownerId != req.userId) {
      res.status(400).send({ error: "only owner can delete this note" })
    }
    else {
      const response = await executeStoredProcedure(constant.deleteById, spInput)
      res.status(200).send({ message: "Note deleted Successfully" })
    }
  }
  catch (error) {
    console.log(error)
    res.status(400).send({ error: error.message })
  }
}

const shareNotes = async (req, res) => {
  try {
    const body = req.body
    const data = body.map((data) => {
      return {
        sharedWith: data.id,
        noteId: req.params.id
      }
    })
    data.map(async (item) => {
      const spInput = await spParameter(item)
      const response = await executeStoredProcedure(constant.shareNote, spInput)
    })
    res.status(200).send({ message: "Note Send Successfully" })
  }
  catch (error) {
    console.log(error)
    res.status(400).send({ error: error.message })
  }
}

const shareUser = async (req, res) => {
  try {
    const owner = {
      ownerId: req.userId
    }
    const spInput = await spParameter(owner)
    const response = await executeStoredProcedure(constant.shareUsers, spInput)
    res.status(200).send({ data: response.recordset })
  }
  catch (error) {
    console.log(error)
  }
}

// const notesOwner = async (req, res) => {
//   try {
//     const owner = {
//       ownerId: req.userId
//     }
//     const spInput = await spParameter(owner)
//     const response = await executeStoredProcedure(constant.shareUsers, spInput)
//     res.status(200).send({ data: response.recordset })
//   }
//   catch (error) {
//     console.log(error)
//   }
// }

module.exports = { addNote, getAllNotes, getNoteById, updateNoteById, deleteNoteByNote, shareNotes, shareUser }