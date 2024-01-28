const fs = require('fs/promises')

const TASKS_PATH = __dirname + '/../../data/tasks.json'

async function findTasks() {
  const tasks = await getAllTasks()
  return tasks
}

async function findTask(id) {
  const tasks = await getAllTasks()
  const task = tasks.find(task => task.id === id)
  return task
}

async function createTask(taskData) {
  const tasks = await getAllTasks()
  const task = {
    id: String(Date.now()),
    title: taskData.title,
    description: taskData.description
  }
  tasks.push(task)
  await fs.writeFile(TASKS_PATH, JSON.stringify(tasks), "utf-8")
  return task
}

async function getAllTasks() {
  const tasksData = await fs.readFile(TASKS_PATH, 'utf-8')
  return JSON.parse(tasksData)
}

module.exports = {
  findTasks,
  findTask,
  createTask
}