const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

const PORT = process.env.PORT || 4001

app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

const api = require('./server/api.js')
app.use('/api', api)

app.listen(PORT, () => console.log(`Server listens at port: ${PORT}`))
