import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Basic health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})