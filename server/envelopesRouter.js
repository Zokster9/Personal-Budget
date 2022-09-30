const express = require('express');
const { getAllEnvelopes } = require('./data')

const envelopesRouter = express.Router();

envelopesRouter.get('/', (req, res, next) => {
    res.send(getAllEnvelopes())
})

module.exports = envelopesRouter
