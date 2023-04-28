const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.port || 8000
const propertiesRouter = require('./routes/propertiesRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const agentRouter = require('./routes/agentsRoutes.js')
const visitRequestRouter = require('./routes/visitRequestRoutes.js')
const reviewRouter = require('./routes/reviewRoutes.js')
const {errorHandler} = require('./middleware/errorMiddleware.js')
const connectDB = require('./config/db.js')


connectDB()
const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) =>{
    res.header("Content-Security-Policy", "default-src 'none'; img-src 'self' data:");
    next();
  });
  
app.use('/backend/uploads/agentImages/',express.static('./backend/uploads/agentImages/'))
app.use('/backend/uploads/propertyImages/',express.static('./backend/uploads/propertyImages/'))
app.use('/backend/uploads/userImages/',express.static('./backend/uploads/userImages/'))


app.use('/api/properties', propertiesRouter)
app.use('/api/users', userRouter)
app.use('/api/agents',agentRouter)
app.use('/api/visitRequests', visitRequestRouter)
app.use('/api/review', reviewRouter)

app.use(errorHandler)

app.listen(port,console.log(`server started at port ${port}`))