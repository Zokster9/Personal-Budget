const pool = require('./pool')
const { isPositiveNum } = require('./validators')

const addTransaction = (req, res) => {
    const date = new Date(Date.now()).toLocaleString().split(',')[0]
    const paymentAmount = Number(req.body.paymentAmount)
    const envelopeId = Number(req.body.envelopeId)
    const { paymentRecipient } = req.body
    try {
        if (isPositiveNum(paymentAmount)) {
            pool.query('UPDATE envelopes SET budget = budget - $1 WHERE id = $2', [paymentAmount, envelopeId], (error, results) => {
                try {
                    if (error) {
                        throw error
                    }
                    pool.query('INSERT INTO transactions (date, payment_amount, payment_recipient, envelope_id) VALUES ($1, $2, $3, $4) RETURNING *',
                        [date, paymentAmount, paymentRecipient, envelopeId], (error, results) => {
                            try {
                                if (error) {
                                    throw error
                                }
                                res.status(201).json(results.rows)
                            } catch (err) {
                                res.status(400).send(err)
                            }
                        }
                    )
                } catch (err) {
                    res.status(400).send(err)
                }
            })  
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

const getAllTransactions = (req, res) => {
    pool.query('SELECT * FROM transactions ORDER BY id', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const getTransactionById = (req, res, next, id) => {
    const transactionId = Number(id)
    pool.query('SELECT * FROM transactions WHERE id = $1', [transactionId], (error, results) => {
        try {
            if (error || results.rows.length === 0) throw error
            req.transaction = results.rows;
            next()
        } catch (err) {
            return res.status(404).send(err)
        }
    })
}

const updateTransaction = (req, res) => {
    const transaction = req.transaction[0]
    pool.query('UPDATE envelopes SET budget = budget + $1 WHERE id = $2', [transaction.payment_amount, transaction.envelope_id],
        (error, results) => {
            try {
                if (error) throw error
                const date = new Date(Date.now()).toLocaleString().split(',')[0]
                const paymentAmount = Number(req.body.paymentAmount)
                const envelopeId = Number(req.body.envelopeId)
                const { paymentRecipient } = req.body

                pool.query('UPDATE envelopes SET budget = budget - $1 WHERE id = $2', [paymentAmount, envelopeId], (error, results) => {
                    try {
                        if (error) {
                            throw error
                        }
                        pool.query('UPDATE transactions SET date = $1, payment_amount = $2, payment_recipient = $3, envelope_id = $4 ' +
                        'WHERE id = $5 RETURNING * ',
                            [date, paymentAmount, paymentRecipient, envelopeId, transaction.id], (error, results) => {
                                try {
                                    if (error) {
                                        throw error
                                    }
                                    res.status(200).json(results.rows)
                                } catch (err) {
                                    res.status(400).send(err)
                                }
                            }
                        )
                    } catch (err) {
                        res.status(400).send(err)
                    }
                })
            } catch (err) {
                res.status(404).send(err)
            }
        }
    )
}

const deleteTransaction = (req, res) => {
    const transaction = req.transaction[0]
    pool.query('UPDATE envelopes SET budget = budget + $1 WHERE id = $2', [transaction.payment_amount, transaction.envelope_id],
        (error, results) => {
            try {
                if (error) throw error
                pool.query('DELETE FROM transactions WHERE id = $1', [transaction.id], (error, results) => {
                    try {
                        if (error) {
                            throw error
                        }
                        res.status(204).send()
                    } catch (err) {
                        res.status(400).send(err)
                    }
                })
            } catch (err) {
                res.status(404).send(err)
            }
        }
    )
}

module.exports = {
    addTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
}