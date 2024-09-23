import { Request, Response } from 'express'
import Project from '../models/project.model'

export class ProjectController {
  static async getAllProjects (req: Request, res: Response): Promise<Response> {
    const projects = await Project.find()

    if (projects.length === 0) return res.status(404).json({ message: 'No projects found' })
    if (projects === null || projects === undefined) return res.status(500).json({ message: 'Error fetching projects}' })

    return res.status(200).json({ data: projects })
  }

  static async createProject (req: Request, res: Response): Promise<Response> {
    const { projectName, description, clientName } = req.body

    const newProject = new Project({
      projectName,
      description,
      clientName
    })

    const saveProject = await newProject.save()

    if (saveProject === null || saveProject === undefined) return res.status(500).json({ message: 'Error creating project' })

    return res.status(201).json({ message: 'Project created' })
  }
}
