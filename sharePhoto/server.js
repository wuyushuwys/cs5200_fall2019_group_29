require('./db')()
const express = require('express')
const personController = require('./controller/personController')
const app = express()

personController(app)


app.listen(4000)
