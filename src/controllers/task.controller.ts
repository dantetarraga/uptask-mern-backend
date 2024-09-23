import { Response, Request } from 'express'
import Project from '../models/project.model'
import Task from '../models/task.model'

export class TaskController {
  static async createTask (req: Request, res: Response): Promise<Response> {
    const { projectId } = req.params

    const project = await Project.findById(projectId)

    if (project === null || project === undefined) return res.status(404).json({ message: 'Project not found' })

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
