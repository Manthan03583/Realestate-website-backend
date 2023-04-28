const express = require('express')
const router = express.Router()
const {setVisitRequest} = require('../controllers/visitRequestController.js')
const protect = require('../middleware/authMiddleware.js')


module.exports = router