import { model, Schema, Types } from 'mongoose'
import { ITask, taskStatus } from '../interface/task.interface'

const TaskSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project',
    required: true
  },
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING
  }
}, { timestamps: true })

TaskSchema.method('toJSON', function () {
  const { __v: version, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

const Task = model<ITask>('Task', TaskSchema)

export default Task
