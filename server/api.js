const express = require('express')
const envelopesRouter = require('./envelopesRouter')
const transactionsRouter = require('./transactionsRouter')

const api = express.Router()

api.use('/envelopes', envelopesRouter)
api.use('/transactions', transactionsRouter)

module.exports = api
