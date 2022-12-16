const executeStoredProcedure = require("../Database/executeStoredProcedure")
const spParameter = require("../services/spInput")
const constant = require("../Constants/constant")

const getSuggestions = async (req, res) => {
    try {
        const suggestion = {
            suggestionId: req.params.id
        }
        const spInput = await spParameter(suggestion)
        const response = await executeStoredProcedure(constant.getSuggestion, spInput)
        res.status(200).send({ data: response.recordset })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}

const addSuggestions = async (req, res) => {
    try {
        const suggestion = {
            ...req.body,
            createdAt: new Date()
        }
        const spInput = await spParameter(suggestion)
        const response = await executeStoredProcedure(constant.addSuggestion, spInput)
        res.status(200).send({ data: response })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}

const updateSuggestions = async (req, res) => {
    try {
        let suggestion = {}
        if (req.body.hasComments === undefined) {
            suggestion.id = req.params.id,
                suggestion.state = req.body.state,
                suggestion.hasComments = 'false'
        }
        else {
            suggestion.id = req.params.id,
                suggestion.state = null,
                suggestion.hasComments = req.body.hasComments
        }
        const spInput = await spParameter(suggestion)
        const response = await executeStoredProcedure(constant.updateSuggestion, spInput)
        res.status(200).send()
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}

module.exports = { addSuggestions, getSuggestions, updateSuggestions }