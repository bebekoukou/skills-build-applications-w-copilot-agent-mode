import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import config from './config'
import healthRouter from './routes/health'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/health', healthRouter)

async function start() {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('MongoDB connection error:', err)
  }

  const port = config.port
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
  })
}

start()
