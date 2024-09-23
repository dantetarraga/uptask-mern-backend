import { Router } from 'express'
import { TaskController } from '../controllers/task.controller'

const taskRouter = Router()

taskRouter.post('/:projectId/tasks', TaskController.createTask)

export default taskRouter
