import express from 'express'
// import compression from "compression";
import https from 'https'
import fs from 'fs'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// routes
import workoutRouter from './routes/workoutRoute.js'
// const workoutRouter = require('./routes/workoutRoute')
import exerciseRouter from './routes/exerciseRoute.js'
// const exerciseRouter = require('./routes/exerciseRoute')
import setRouter from './routes/setRoute.js'
import userRouter from './routes/userRoute.js'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

dotenv.config()
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set default port for express app
const PORT = process.env.PORT || 4001

app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:3000",
    // origin: "https://shimmering-cranachan-8a7432.netlify.app",
    origin: ['https://gymmy-umber.vercel.app/', 'https://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  })
)

const options = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt'),
}

// app.use(cors())
// app.use(compression());

app.use('/api/users', userRouter)
app.use('/api/workouts', workoutRouter)
app.use('/api/exercises', exerciseRouter)
app.use('/api/sets', setRouter)

app.use(notFound)
app.use(errorHandler)

// app.listen(PORT, () => {
//   console.log('server is running on port: ', PORT)
// })

process.env.NODE_ENV === 'development'
  ? https.createServer(options, app).listen(PORT, () => {
      console.log('server is running on port (dev): ', PORT)
    })
  : app.listen(PORT, () => {
      console.log('server is running on port: ', PORT)
    })
