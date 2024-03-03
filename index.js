var express = require('express')
var app = express()
app.use(express.json())
const moment = require('moment')
const fs = require('fs')
var tasks = require('./tasks.js')

// writeFile Function Write The Array on File
const writeFile = () => {
  fs.writeFileSync('./tasks.js', `module.exports = ${JSON.stringify(tasks)};`)
}

//generateId Function Generates A RandomID
const generateId = (length) => {
  var result = ''
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charsLen = chars.length
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLen))
  }
  return result
}

// Middleware For Basic Validation
const validateData = (req, res, next) => {
  if (req.body.title === '' || req.body.description === '') {
    return res.status(400).send({
      status: 'Failure',
      response: 'Both Title and Description are required',
    })
  }
  next()
}

// First Page You After Running The App
app.get('/', function (req, res) {
  res.send('Hello World!')
})

// http://localhost:3000/tasks
// app.get('/tasks', (req, res) => {
//   const keys = Object.keys(tasks)
//   const todoData = {}
//   keys.forEach((key) => {
//     todoData[key] = tasks[key]
//   })
//   return res.status(200).send({
//     status: 'Success',
//     response: {
//       data: todoData,
//     },
//   })
// })


// GET Operation is used to view the all tasks in the tasks.js file
// http://localhost:3000/tasks?page=1&limit=1
app.get('/tasks', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5
  const keys = Object.keys(tasks)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedKeys = keys.slice(startIndex, endIndex)
  const paginatedData = {}
  paginatedKeys.forEach((key) => {
    paginatedData[key] = tasks[key]
  })
  return res.status(200).send({
    status: 'Success',
    response: {
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(keys.length / limit),
    },
  })
})

// GET Operation is used to view the task with a specific id
// http://localhost:3000/tasks/PbE4Vym
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params
  if (!(id in tasks)) {
    return res.status(404).send({
      status: 'Failure',
      response: 'Task not found',
    })
  } else {
    return res.status(200).send({
      status: 'Success',
      response: tasks[id],
    })
  }
})

// POST Operation is used to add a new task into the file
app.post('/tasks', validateData, (req, res) => {
  tasks[`${generateId(7)}`] = {
    title: req.body.title,
    description: req.body.description,
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: null,
  }
  writeFile()
  return res.status(200).send({
    status: 'Success',
    response: 'Task is added',
  })
})


// PUT operation to update data
app.put('/tasks/:id', validateData, (req, res) => {
  const { id } = req.params
  const newTask = req.body
  tasks[id]['title'] = newTask.title
  tasks[id]['description'] = newTask.description
  writeFile()
  return res.status(200).send({
    status: 'Success',
    response: 'Task is Updated',
  })
})

// DELETE operation to delete data
// http://localhost:3000/tasks/PbE4Vym
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params
  if (!(id in tasks)) {
    return res.status(404).send({
      status: 'Failure',
      response: 'Task not found',
    })
  } else {
    delete tasks[id]
    writeFile()
    return res.status(200).send({
      status: 'Success',
      response: 'Task is Deleted',
    })
  }
})


// This function is used to continously listen to the port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})