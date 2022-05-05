const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const { connectDB } = require('./db/connect')

const firstRoute = require('./routes/first.route')
const employeeRoute = require('./routes/employee.route')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/v1/first', firstRoute)
app.use('/api/v1/employee', employeeRoute)

const start = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Listener on http://localhost:${PORT} ...`)
    })
  } catch (error) {
    console.log(error.message)
  }
}

start()
