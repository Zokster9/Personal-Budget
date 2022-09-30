const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 4001

app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.json())



app.listen(PORT, () => console.log(`Server listens at port: ${PORT}`))
