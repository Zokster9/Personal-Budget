const hasName = (req, res, next) => {
    if (req.body.name) {
        next()
    } else {
        return res.status(400).send('Name must be included in the request body')
    }
}

const hasBudget = (req, res, next) => {
    if (req.body.budget) {
        next()
    } else {
        return res.status(400).send('Budget must be included in the request body')
    }
}

const hasSpendingAmount = (req, res, next) => {
    if (req.body.spendingAmount) {
        next()
    } else {
        return res.status(400).send('Spending amount must be included in the request body')
    }
}

const hasAmount = (req, res, next) => {
    if (req.body.amount) {
        next()
    } else {
        return res.status(400).send('Amount must be included in the request body')
    }
}

const hasMoney = (req, res, next) => {
    if (req.body.money) {
        next()
    } else {
        return res.status(400).send('Money must be included in the request body')
    }
}

const isPositiveNum = input => {
    if (typeof input === 'number' && input >= 0) {
        return true
    } else {
        throw new Error('Value must be a number greater than 0')
    }
}

const hasPaymentAmount = (req, res, next) => {
    if (req.body.paymentAmount) {
        next()
    } else {
        return res.status(400).send('Payment amount must be included in the request body')
    }
}

const hasPaymentRecipient = (req, res, next) => {
    if (req.body.paymentRecipient) {
        next()
    } else {
        return res.status(400).send('Payment recipient must be included in the request body')
    }
}

const hasEnvelopeId = (req, res, next) => {
    if (req.body.envelopeId) {
        next()
    } else {
        return res.status(400).send('Envelope id must be included in the request body')
    }
}

module.exports = {
    hasName,
    hasBudget,
    hasSpendingAmount,
    hasAmount,
    hasMoney,
    hasPaymentAmount,
    hasPaymentRecipient,
    hasEnvelopeId,
    isPositiveNum
}