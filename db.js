import mongoose from 'mongoose'

export const dbconnect = async () => {
  try {
    // Replace 'yourdbname' with the name of your database
    await mongoose.connect('mongodb://127.0.0.1:27017/redux', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Successfully connected to the database')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    // You can add additional handling here (e.g., exit process, retry, etc.)
    process.exit(1) // Exit the process if unable to connect
  }
}
