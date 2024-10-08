import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './database/config'
import projectRouter from './routes/project.router'
import cors from 'cors'
// import authRouter from './routes/auth.router'
import taskRouter from './routes/task.router'

dotenv.config()

connectDB()

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/projects', projectRouter)
app.use('/api/projects', taskRouter)
// app.use('/api/auth', authRouter)

export default app
