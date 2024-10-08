import { model, Schema } from 'mongoose'
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
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

// ProjectSchema.method('toJSON', function () {
//   const { __v: version, _id, ...object } = this.toObject()
//   object.id = _id
//   return object
// })

const Project = model<IProject>('Project', ProjectSchema)

export default Project
