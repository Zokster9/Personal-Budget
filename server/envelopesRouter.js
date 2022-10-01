const express = require('express');
const { getAllEnvelopes, addEnvelope, getEnvelopeById, updateEnvelope, 
    deleteEnvelopeById, transferMoney, addMoneyToAllEnvelopes } = require('./data')

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

envelopesRouter.param('targetEnvelopeId', (req, res, next, id) => {
    const envelopeId = Number(id)
    try {
        const envelope = getEnvelopeById(envelopeId)
        req.targetEnvelope = envelope
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

envelopesRouter.put('/:envelopeId', (req, res, next) => {
    try {
        const updatedEnvelope = updateEnvelope(req.envelope.id, req.body.name, Number(req.body.spendingAmount))
        if (updatedEnvelope) {
            res.send(updatedEnvelope)
        } else {
            res.status(400).send()
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

envelopesRouter.delete('/:envelopeId', (req, res, next) => {
    deleteEnvelopeById(req.envelope.id)
    res.status(204).send()
})

envelopesRouter.post('/:envelopeId/:targetEnvelopeId', (req, res, next) => {
    try {
        const updatedEnvelopes = transferMoney(req.envelope.id, req.targetEnvelope.id, Number(req.body.amount))
        if (updatedEnvelopes) {
            res.send(updatedEnvelopes)
        } else {
            res.status(400).send(err)
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

envelopesRouter.put('/', (req, res, next) => {
    try {
        const envelopes = addMoneyToAllEnvelopes(Number(req.body.money))
        if (envelopes) {
            res.send(envelopes)
        } else {
            res.status(400).send()
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = envelopesRouter
