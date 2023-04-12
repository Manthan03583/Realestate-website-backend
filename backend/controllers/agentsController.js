const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Agent = require('../models/agentsModel.js')

// @desc    Register new Agent
// @route   POST /api/agents
//@access   Public
const registeragent = asyncHandler(async(req,res) =>{

    const {name, email, password, address, review} = req.body

    if(!name || !email || !password ){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if agent exists
    const agentExists = await Agent.findOne({email})

    if(agentExists){
        res.status(400)
        throw new Error('agent already exists') 
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    var setPath = (file) =>{
        var site = file.path;
        if (path.sep === '\\') {
            site = site.split(path.sep).join('/');
        }
        site = process.env.SITE_NAME + site;
        
        return site;
    }

    //set profile pic
    const profilePic = req.files && req.files.length > 0 ? req.files.map(setPath):null;
    //create agent
    const agent = await Agent.create({
        name,
        email,
        password: hashedPassword,
        profilePic,
        review,
        address
    })

    if(agent){
        res.status(201).json({
            _id: agent.id,
            name: agent.name,
            email: agent.email,
            token: generateToken(agent._id),
            profilePic: agent.profilePic,
            review: agent.review,
            address: agent.address
        })
    }else{
        res.status(404)
        throw new Error('Invalid agent data')
    }

    // res.json({message: 'Register agent'})
})

// @desc    Authenticate agent
// @route   POST /api/agents/login
//@access   Public
const loginagent = asyncHandler(async(req,res) =>{
    const {email, password} = req.body
    
    //check agent email
    const agent = await Agent.findOne({email})

    if(agent && (await bcrypt.compare(password, agent.password))){
        res.json({
            _id: agent.id,
            name: agent.name,
            email: agent.email,
            token: generateToken(agent._id)
        })
    }else{
        res.status(404)
        throw new Error('Invalid credentials ')
    }

    // res.json({message: 'Login agent'})
})

// @desc    Get agent data
// @route   GET /api/agents/me
//@access   private
const getagent = asyncHandler(async(req,res) =>{
    const { _id, name, email, profilePic, review, address} = await Agent.findById(req.decodedAgent.id)

    res.status(200).json({
        id:_id,
        name,
        email,
        profilePic,
        review,
        address
    })
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn : '30d' 
    })
}

const signoutagent = asyncHandler(async(req,res)=>{
    res.clearCookie('jwt');
    res.send({message: 'Signout successfully'})
})

const agentList = asyncHandler(async(req,res) =>{

    const agents =  await Agent.find({}, '-password -email')
    if(agents){
        res.status(200).json(agents)
    }
    else{
        res.status(404)
        throw new Error('Error finding agents')
    }
    
})

module.exports = {
    registeragent,
    loginagent,
    getagent,
    signoutagent,
    agentList
}