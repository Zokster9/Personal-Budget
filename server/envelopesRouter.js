const express = require('express');
const { getAllEnvelopes, addEnvelope } = require('./data')

const envelopesRouter = express.Router();

envelopesRouter.get('/', (req, res, next) => {
    res.send(getAllEnvelopes())
})

envelopesRouter.post('/', (req, res, next) => {
    try {
        const envelope = addEnvelope(req.body.name, Number(req.body.budget))
        if (envelope) {
            res.status(201).send(envelope)
        } else {
            res.status(400).send()
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = envelopesRouter
