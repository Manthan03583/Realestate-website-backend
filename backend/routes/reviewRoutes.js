const express = require('express')
const router = express.Router()
const {setReview, getAgentReviews} = require('../controllers/reviewController.js')
const protect = require('../middleware/authMiddleware.js')

router.route('/').post(protect,setReview)
router.route('/:id').get(getAgentReviews)

module.exports = router
