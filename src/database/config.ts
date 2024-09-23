import mongoose from 'mongoose'

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL as string)

    console.log(`MongoDB Connected: ${conn.connection.host} - ${conn.connection.port}`)
  } catch (error) {
    if (error instanceof Error) console.error(`Error: ${error.message}`)
  }
}
