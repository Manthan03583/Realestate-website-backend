const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.port || 8000
const propertiesRouter = require('./routes/propertiesRoutes')
const userRouter = require('./routes/userRoutes')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')


connectDB()
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uplaods',express.static('uploads'))

app.use('/api/properties', propertiesRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)

app.listen(port,console.log(`server started at port ${port}`))