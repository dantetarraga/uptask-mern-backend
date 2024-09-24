import { Router } from 'express'
import { TaskController } from '../controllers/task.controller'
import { validateProjectExists } from '../middlewares/project-exists.middleware'
import { validateTask } from '../validators/task.validator'

const taskRouter = Router()

taskRouter.post(
  '/:projectId/tasks',
  validateProjectExists,
  TaskController.createTask
)

taskRouter.get(
  '/:projectId/tasks',
  validateProjectExists,
  [...validateTask],
  TaskController.getAllTask
)

export default taskRouter
