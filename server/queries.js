const Pool = require('pg').Pool
const { isPositiveNum } = require('./validators')
const dotenv = require(('dotenv'))
dotenv.config()

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
})

const getAllEnvelopes = (req, res) => {
    pool.query('SELECT * FROM envelopes ORDER BY id', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const getEnvelopeById = (req, res, next, id) => {
    const envelopeId = Number(id)
    pool.query('SELECT * FROM envelopes WHERE id = $1', [envelopeId], (error, results) => {
        try {
            if (error || results.rows.length === 0) throw error
            req.envelope = results.rows;
            next()
        } catch (err) {
            return res.status(404).send(err)
        }
    })
}

const getTargetEnvelopeById = (req, res, next, id) => {
    const envelopeId = Number(id)
    pool.query('SELECT * FROM envelopes WHERE id = $1', [envelopeId], (error, results) => {
        try {
            if (error || results.rows.length === 0) throw error
            req.targetEnvelope = results.rows;
            next()
        } catch (err) {
            return res.status(404).send(err)
        }
    })
}

const addEnvelope = (req, res) => {
    const { name, budget } = req.body
    pool.query('INSERT INTO envelopes (name, budget) VALUES ($1, $2) RETURNING *', [name, Number(budget)],
        (error, results) => {
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
}

const updateEnvelope = (req, res) => {
    const envelope = req.envelope[0]
    const { name, spendingAmount } = req.body
    try {
        if (isPositiveNum(Number(spendingAmount))) {
            pool.query('UPDATE envelopes SET name = $1, budget = budget - $2 WHERE id = $3 RETURNING *',
                [name, Number(spendingAmount), envelope.id], (error, results) => {
                    try {
                        if (error) {
                            throw error
                        }
                        res.json(results.rows)
                    } catch (err) {
                        res.status(400).send(err)
                    }
                }
            )
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

const deleteEnvelope = (req, res) => {
    const envelope = req.envelope[0]
    pool.query('DELETE FROM envelopes WHERE id = $1', [envelope.id], (error, results) => {
        try {
            if (error) {
                throw error
            }
            res.status(204).send()
        } catch (err) {
            res.status(500).send(err)
        }
    })
}

const takeMoneyFromEnvelope = (req, res, next) => {
    const sourceEnvelope = req.envelope[0]
    const amount = req.body.amount
    try {
        if (isPositiveNum(Number(amount))) {
            pool.query('UPDATE envelopes SET budget = budget - $1 WHERE id = $2 RETURNING *', [Number(amount), sourceEnvelope.id],
                (error, results) => {
                    try {
                        if (error) {
                            throw error
                        }
                        req.updatedSourceEnvelope = results.rows[0]
                        next()
                    } catch (err) {
                        return res.status(400).send('You cant take more money from an envelope than available')
                    }
                }
            )
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

const addMoneyToEnvelope = (req, res, next) => {
    const targetEnvelope = req.targetEnvelope[0]
    const amount = req.body.amount
    try {
        if (isPositiveNum(Number(amount))) {
            pool.query('UPDATE envelopes SET budget = budget + $1 WHERE id = $2 RETURNING *', [Number(amount), targetEnvelope.id],
                (error, results) => {
                    try {
                        if (error) {
                            throw error
                        }
                        req.updatedTargetEnvelope = results.rows[0]
                        next()
                    } catch (err) {
                        return res.status(500).send(err)
                    }
                }
            )
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

const addMoneyToAllEnvelopes = (req, res) => {
    const money = req.body.money
    try {
        if (isPositiveNum(Number(money))) {
            pool.query('WITH updated AS (UPDATE envelopes SET budget = budget + $1 RETURNING *) ' +
            'SELECT * FROM updated ORDER BY id;', [Number(money)],
                (error, results) => {
                    try {
                        if (error) {
                            throw error
                        }
                        res.json(results.rows)
                    } catch (err) {
                        return res.status(400).send(err)
                    }
                }
            )
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    getAllEnvelopes,
    getEnvelopeById,
    addEnvelope,
    updateEnvelope,
    deleteEnvelope,
    getTargetEnvelopeById,
    takeMoneyFromEnvelope,
    addMoneyToEnvelope,
    addMoneyToAllEnvelopes
}