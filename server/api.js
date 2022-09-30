const express = require('express')
const envelopesRouter = require('./envelopesRouter')

const api = express.Router()

api.use('/envelopes', envelopesRouter)

module.exports = api
