const express = require('express')
const router = express.Router()
const {setVisitRequest} = require('../controllers/visitRequestController.js')
const protect = require('../middleware/authMiddleware.js')

router.route('/setvisit').post(protect,setVisitRequest)
module.exports = router