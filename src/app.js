const express = require('express')
require('dotenv').config()

const firstRoute = require('./routes/first.route')
const employeeRoute = require('./routes/employee.route')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

// Routes
app.use('/api/v1/first', firstRoute)
app.use('/api/v1/employee', employeeRoute)

const start = () => {
  app.listen(PORT, () => {
    console.log(`Listener on http://localhost:${PORT} ...`)
  })
}

start()
