class Envelope {
    constructor(id, name, budget) {
        this._id = id
        this._name = name
        this._budget = budget
    }

    get id () {
        return this._id
    }

    get name () {
        return this._name
    }

    get budget () {
        return this._budget
    }

    set name(name) {
        this._name = name
    }

    set budget(budget) {
        if (isPositiveNum(budget)) {
            this._budget = budget
        }
    }

    spendMoney(amountToSpend) {
        if (isPositiveNum(amountToSpend)) {
            if (this._budget >= amountToSpend) {
                this._budget -= amountToSpend
                return true
            }
            throw new Error('Spending amount cannot be greater than the budget available')
        }        
    }

    addMoney(value) {
        if (isPositiveNum(value)) {
            this._budget += value
            return true
        }
    }
}

const isPositiveNum = input => {
    if (typeof input === 'number' && input > 0) {
        return true
    } else {
        throw new Error('Value must be a number greater than 0')
    }
}

const nameExists = name => {
    const found = envelopes.find(envelope => envelope.name === name)
    if (!found) {
        return false
    }
    throw new Error('Name already exists')
}

const envelopes = []
let id = 0

const generateEnvelopes = () => {
    envelopes.push(new Envelope(++id, 'Groceries', 100))
    envelopes.push(new Envelope(++id, 'Rent', 200))
    envelopes.push(new Envelope(++id, 'Gas', 70))
    envelopes.push(new Envelope(++id, 'Utilities', 30))
    envelopes.push(new Envelope(++id, 'Personal Care', 70))
    envelopes.push(new Envelope(++id, 'Savings', 30))
}

generateEnvelopes()

const getAllEnvelopes = () => envelopes

const addEnvelope = (name, budget) => {
    if (isPositiveNum(budget) && !nameExists(name)) {
        const newEnvelope = new Envelope(++id, name, budget)
        envelopes.push(newEnvelope)
        return newEnvelope
    }
}

const getEnvelopeById = id => {
    const index = envelopes.findIndex(envelope => envelope.id === id)
    if (index !== -1) {
        return envelopes[index]
    }
    throw new Error('Envelope with this id does not exist')
}

module.exports = {
    getAllEnvelopes,
    addEnvelope,
    getEnvelopeById,
}
