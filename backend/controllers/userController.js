const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')

// @desc    Register new user
// @route   POST /api/users
//@access   Public
const registerUser = asyncHandler(async(req,res) =>{

    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists') 
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    var site = req.file.path;

    if (path.sep === '\\') {
        site = site.split(path.sep).join('/');
    }

    site = process.env.SITE_NAME + site;

    //set profile pic
    const profilePic = req.file ? site : null;
    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profilePic
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            profilePic: user.profilePic
        })
    }else{
        res.status(404)
        throw new Error('Invalid user data')
    }

    // res.json({message: 'Register User'})
})

// @desc    Authenticate user
// @route   POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async(req,res) =>{
    const {email, password} = req.body
    
    //check user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(404)
        throw new Error('Invalid credentials ')
    }

    // res.json({message: 'Login User'})
})

// @desc    Get user data
// @route   GET /api/users/me
//@access   private
const getMe = asyncHandler(async(req,res) =>{
    const { _id, name, email, profilePic} = await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        name,
        email,
        profilePic
    })
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn : '30d' 
    })
}

const signoutUser = asyncHandler(async(req,res)=>{
    res.clearCookie('jwt');
    res.send({message: 'Signout successfully'})
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    signoutUser
}