import mongoose, { Schema } from 'mongoose'
import { IProject } from '../interface/project.interface'

const ProjectSchema: Schema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
})

const Project = mongoose.model<IProject>('Project', ProjectSchema)

export default Project
