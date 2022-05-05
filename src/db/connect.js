const mongoose = require('mongoose')

const stringConnect = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SECRET}@${process.env.DB_URI}${process.env.DB_NAME}?retryWrites=true&w=majority  `

const connectDB = async () => {
  try {
    await mongoose.connect(stringConnect)
    console.log('Connected to database...')
  } catch (error) {}
}

module.exports = { connectDB }
