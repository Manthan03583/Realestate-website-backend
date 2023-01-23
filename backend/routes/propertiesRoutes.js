const express = require('express')
const router =  express.Router()
const { getPropertiesOfUser, getProperty, getProperties, setProperty, updateProperty, deleteProperty, viewImage} =  require('../controllers/propertiesController')
const {protect} = require('../middleware/authMiddleware')
const upload = require('../middleware/uploads')

router.route('/all-properties').get(getProperties)
router.route('/').get(protect, getPropertiesOfUser).post(protect, upload.array('photos', 100), setProperty)

router.route('/:id').get(getProperty).put(protect, updateProperty).delete(protect, deleteProperty)

router.route('/:name').get()

module.exports = router