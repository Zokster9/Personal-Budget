const express = require('express');
const { hasPaymentAmount, hasPaymentRecipient, hasEnvelopeId } = require('./validators')
const { addTransaction, getAllTransactions, getTransactionById, updateTransaction, deleteTransaction } = require('./transactionQueries')

const transactionsRouter = express.Router()

transactionsRouter.param('transactionId', getTransactionById)

transactionsRouter.post('/', hasPaymentAmount, hasPaymentRecipient, hasEnvelopeId, addTransaction)
transactionsRouter.get('/', getAllTransactions)
transactionsRouter.get('/:transactionId', (req, res) => {
    res.json(req.transaction)
})
transactionsRouter.put('/:transactionId', hasPaymentAmount, hasPaymentRecipient, hasEnvelopeId, updateTransaction)
transactionsRouter.delete('/:transactionId', deleteTransaction)

module.exports = transactionsRouter