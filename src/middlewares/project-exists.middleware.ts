import { Request, Response, NextFunction, RequestHandler } from 'express'
import Project from '../models/project.model'
import { IProject } from '../interface/project.interface'

declare global {
  namespace Express {
    interface Request {
      project: IProject
    }
  }
}

export const validateProjectExists: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.params
  const project = await Project.findById(projectId)

  if (project === null || project === undefined) {
    return res.status(404).json({
      message: 'Project not found'
    })
  }

  req.project = project
  next()
}
