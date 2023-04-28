const express = require('express')
const router = express.Router()
const {setReview, getAgentReviews} = require('../controllers/reviewController.js')

router.route('/').post(protect,setReview)
router.route('/:id').get(getAgentReviews)

module.exports = router
