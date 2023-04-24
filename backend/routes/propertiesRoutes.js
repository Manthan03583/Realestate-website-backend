const express = require('express')
const router =  express.Router()
const { getPropertiesOfAgent, getProperty, getProperties, setProperty, updateProperty, deleteProperty} =  require('../controllers/propertiesController.js')
const protect = require('../middleware/authMiddleware.js')
const {uploadPropertyImages} = require('../middleware/uploads.js')

router.route('/all-properties').get(getProperties)
router.route('/').post(protect, uploadPropertyImages.array('photos', 100), setProperty)
router.route('/agentProperties/:id').get(getPropertiesOfAgent)
router.route('/:id').get(getProperty).put(protect, updateProperty).delete(protect, deleteProperty)

module.exports = router