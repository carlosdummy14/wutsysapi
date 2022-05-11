const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { connectDB } = require('./db/connect')
require('dotenv').config()

const employeeRoute = require('./routes/employee.route')
const assetRoute = require('./routes/asset.route')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/v1/employee', employeeRoute)
app.use('/api/v1/asset', assetRoute)
app.use(errorHandler)
app.use(notFound)

const start = async () => {
  try {
    await connectDB(process.env.DB_URI)
    app.listen(PORT, () => {
      console.log(`Listener on http://localhost:${PORT} ...`)
    })
  } catch (error) {
    console.log(error.message)
  }
}

start()
