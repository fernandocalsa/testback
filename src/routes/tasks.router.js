const express = require("express");
const tasksController = require("../controllers/tasks.controller")

const tasksRouter = express.Router()

tasksRouter.get('/', tasksController.getTasks)

tasksRouter.get('/:id', tasksController.getTask)

tasksRouter.post('/', tasksController.createTask)

module.exports = tasksRouter