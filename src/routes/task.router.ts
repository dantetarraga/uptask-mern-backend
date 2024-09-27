import { Router } from 'express'
import { TaskController } from '../controllers/task.controller'
import { validateProjectExists } from '../middlewares/project-exists.middleware'
import {
  validateStatus,
  validateTaskFields,
  validateTaskId
} from '../validators/task.validator'
import { validatorFields } from '../middlewares/validator-fields.middleware'
import { validateTaskExists, validateTaskProject } from '../middlewares/task-exists.middleware'

const taskRouter = Router()
taskRouter.param('projectId', validateProjectExists)
taskRouter.param('taskId', validateTaskExists)
taskRouter.param('taskId', validateTaskProject)

taskRouter.post(
  '/:projectId/tasks',
  [...validateTaskFields],
  validatorFields,
  TaskController.createTask
)

taskRouter.get('/:projectId/tasks', TaskController.getTasksByProject)

taskRouter.get(
  '/:projectId/tasks/:taskId',
  validateTaskId,
  validatorFields,
  TaskController.getTaskById
)

taskRouter.put(
  '/:projectId/tasks/:taskId',
  [...validateTaskFields, ...validateTaskId],
  validatorFields,
  TaskController.updateTask
)

taskRouter.delete(
  '/:projectId/tasks/:taskId',
  validateTaskId,
  TaskController.deleteTask
)
taskRouter.patch(
  '/:projectId/tasks/:taskId',
  [...validateTaskId, ...validateStatus],
  TaskController.updateStatusTask
)

export default taskRouter
