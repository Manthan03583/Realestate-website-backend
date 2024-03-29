const express = require('express')
const router = express.Router()
const {registeragent, loginagent, getagent, signoutagent, agentList } = require('../controllers/agentsController.js')
const protect = require('../middleware/authMiddleware.js')
const {uploadAgentsImage} = require('../middleware/uploads.js')

router.route('/register').post(uploadAgentsImage.single('profilePic'),registeragent)
router.post('/login',loginagent)
router.get('/signout',protect,signoutagent)
router.get('/all-agents',agentList)
router.route('/:id').get(getagent)

module.exports = router;
