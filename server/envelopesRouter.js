const express = require('express');
const { getAllEnvelopes, addEnvelope, getEnvelopeById } = require('./data')

const envelopesRouter = express.Router();

envelopesRouter.param('envelopeId', (req, res, next, id) => {
    const envelopeId = Number(id)
    try {
        const envelope = getEnvelopeById(envelopeId)
        req.envelope = envelope
        next()
    } catch (err) {
        return res.status(404).send(err)
    }
})

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

envelopesRouter.get('/:envelopeId', (req, res, next) => {
    res.send(req.envelope)
})

module.exports = envelopesRouter
