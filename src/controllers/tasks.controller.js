const tasksModel = require("../models/tasks.model");

async function getTasks(req, res) {
  const tasks = await tasksModel.findTasks()
  res.json(tasks)
}

async function getTask(req, res) {
  const { id } = req.params
  const task = await tasksModel.findTask(id)
  if (!task) {
    return res.status(404).send()
  }
  res.json(task)
}

async function createTask(req, res) {
  const {
    title,
    description
  } = req.body

  if (!title || !description) {
    return res.status(400).send()
  }
  const taskCreated = await tasksModel.createTask({
    title,
    description
  })
  res.json(taskCreated)
}

module.exports = {
  getTasks,
  getTask,
  createTask
}