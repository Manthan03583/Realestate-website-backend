const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, signoutUser } = require('../controllers/userController.js')
const protect = require('../middleware/authMiddleware.js')
const {uploadUsersImage} = require('../middleware/uploads.js')

router.route('/register').post(uploadUsersImage.single("profilePic"),registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
router.get('/signout',signoutUser)

module.exports = router