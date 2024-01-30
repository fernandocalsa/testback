const request = require('supertest')
const app = require('../src/app')
const fs = require('fs/promises')

const TASKS = [
  {
    "id": "01",
    "title": "test 01",
    "description": "test 01"
  },
  {
    "id": "02",
    "title": "test 01",
    "description": "test 02"
  },
  {
    "id": "03",
    "title": "test 01",
    "description": "test 03"
  }
]
describe('app', () => {
  beforeEach(async () => {
    await fs.writeFile(
      __dirname + '/../data/tasks.json',
      JSON.stringify(TASKS)
    )
  })

  describe('get all tasks', () => {
    test('returns status 200', async () => {
      const response = await request(app).get('/tasks').send()
      expect(response.status).toBe(200)
    })

    test('returns 3 tasks', async () => {
      const response = await request(app).get('/tasks').send()
      expect(response.body).toHaveLength(3)
    })
  })

  describe('get task by id', () => {
    test('returns a task by id', async () => {
      const response = await request(app).get('/tasks/01').send()
      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: "01",
        title: "test 01",
        description: "test 01"
      })
    })

    test('does not return a task by id', async () => {
      const response = await request(app).get('/tasks/01asdfvzdsf').send()
      expect(response.status).toBe(404)
      expect(response.body).toEqual({})
    })
  })

  describe('create task', () => {
    test('creates task succes', async () => {
      const response = await request(app).post('/tasks').send({
        title: "mock title",
        description: "mock description"
      })
      expect(response.status).toBe(200)
    })
  })
})