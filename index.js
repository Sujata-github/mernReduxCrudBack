//Backend entry point

import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes.js'
import { dbconnect } from './db.js'

const app = express()
const port = 4200

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// //MongoDB Connection
const MONGO_URI = 'mongodb://192.168.1.23:27017/new_redux_crud'

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB', err)
  })

//await dbconnect()
//API Routes
app.use('/api/users', userRoutes)

//start server
app.listen(port, () => console.log(`Server running on ${port} `))
