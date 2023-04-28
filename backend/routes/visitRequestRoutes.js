const express = require('express')
const router = express.Router()
const {setVisitRequest} = require('../controllers/visitRequestController.js')

router.route('/setvisit').post(setVisitRequest)
module.exports = router