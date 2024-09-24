import { Response, Request } from 'express'
import Task from '../models/task.model'

export class TaskController {
  static async createTask (req: Request, res: Response): Promise<Response> {
    const { project } = req.body.project

    const task = new Task(req.body)
    task.project = project.id
    project.tasks.push(task.id)

    try {
      await task.save()
      await project.save()
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }

    return res.status(201).json({ message: 'Task created', task })
  }
}
