const express = require('express')
const tasksRouter = require('./routes/tasks.router')
const app = express()

app.use(express.json())

app.use('/tasks', tasksRouter)

module.exports = app