const express = require('express');
const { getAllEnvelopes, getEnvelopeById, addEnvelope, updateEnvelope, deleteEnvelope,
    getTargetEnvelopeById, takeMoneyFromEnvelope, addMoneyToEnvelope, addMoneyToAllEnvelopes } = require('./envelopeQueries')
const { hasName, hasBudget, hasSpendingAmount, hasAmount, hasMoney } = require('./validators')

const envelopesRouter = express.Router();

envelopesRouter.param('envelopeId', getEnvelopeById)

envelopesRouter.param('targetEnvelopeId', getTargetEnvelopeById)

envelopesRouter.get('/', getAllEnvelopes)

envelopesRouter.post('/', hasName, hasBudget, addEnvelope)

envelopesRouter.get('/:envelopeId', (req, res) => {
    res.json(req.envelope)
})

envelopesRouter.put('/:envelopeId', hasName, hasSpendingAmount, updateEnvelope)

envelopesRouter.delete('/:envelopeId', deleteEnvelope)

envelopesRouter.post('/:envelopeId/:targetEnvelopeId', hasAmount, takeMoneyFromEnvelope, addMoneyToEnvelope, (req, res) => {
    res.json([req.updatedSourceEnvelope, req.updatedTargetEnvelope])
})

envelopesRouter.put('/', hasMoney, addMoneyToAllEnvelopes)

module.exports = envelopesRouter
