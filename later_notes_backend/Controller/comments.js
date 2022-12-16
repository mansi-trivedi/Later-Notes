const executeStoredProcedure = require("../Database/executeStoredProcedure")
const spParameter = require("../services/spInput")
const constant = require("../Constants/constant")

const getComment = async (req, res) => {
    try {
        const comment = {
            threadId: req.params.threadId,
        }
        const spInput = await spParameter(comment)
        const response = await executeStoredProcedure(constant.getComments, spInput)
        res.status(200).send({ data: response.recordset })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}


const addComment = async (req, res) => {
    try {
        const comment = {
            ...req.body,
            createdAt: new Date()
        }
        const spInput = await spParameter(comment)
        const response = await executeStoredProcedure(constant.addComments, spInput)
        res.status(200).send({ data: response })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}

const updateComment = async (req, res) => {
    try {
        const comment = {
            threadId: req.params.threadId,
            commentId: req.params.commentId,
            ...req.body
        }
        const spInput = await spParameter(comment)
        const response = await executeStoredProcedure(constant.updateComments, spInput)
        res.status(200).send()
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = {
            threadId: req.params.threadId,
            commentId: req.params.commentId,
        }
        const spInput = await spParameter(comment)
        const response = await executeStoredProcedure(constant.deleteComments, spInput)
        res.status(200).send()
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}

module.exports = { getComment, addComment, deleteComment, updateComment }