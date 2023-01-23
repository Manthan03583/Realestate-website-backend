const asyncHandler = require('express-async-handler')
const Property = require('../models/propertyModel')
const User = require('../models/userModel')

// @desc    Get All Properties
// @route   GET /api/properties
//@access   public
const getProperties = asyncHandler(async(req,res) =>{

    const properties =  await Property.find()

    // res.status(200).json({ message: 'Get Properties' })
    res.status(200).json(properties)
})

const getProperty = asyncHandler(async(req, res)=>{

    const property = await Property.findById(req.params.id)

    res.status(200).json(property)

})

// @desc    Get Properties
// @route   GET /api/properties
//@access   Private
const getPropertiesOfUser = asyncHandler(async(req,res) =>{

    const properties = await Property.find({user: req.user.id})

    // res.status(200).json({ message: 'Get Properties' })
    res.status(200).json(properties)
})

// @desc    Set Property
// @route   POST /api/properties
//@access   Private
const setProperty = asyncHandler(async(req,res) =>{
    // console.log(req.body)

    if(!req.body.Property_type || !req.body.Location){
        // res.status(400).json({message: 'Please add a text field'})
        res.status(400)
        throw new Error('Please add property type or location')
    }

    // function setPhotos(){
    //     const images=[]
    //     if(Array.isArray(req.files.path)){
    //         for(let i = 0; i< req.files.path.length; i++){
    //             images.push(req.files.path[i])
    //         }
    //     }
    //     else{
    //         images.push(req.files.path)
    //     }
    //     return images
    // }

    const property = await Property.create({
        Property_type: req.body.Property_type,
        Location: req.body.Location,
        developer_name: req.body.developer_name,
        name_of_property: req.body.name_of_property,
        Bedrooms: req.body.Bedrooms,
        Bathrooms: req.body.Bathrooms,
        Balcony: req.body.Balcony,
        Three_link: req.body.Three_link,
        price: req.body.price,
        // photos: setPhotos(),
        user: req.user.id
    })

    // if(req.file){
    //     property.photos = req.file.path
    // }

    // res.status(200).json({ message: 'Set Property' })
    res.status(200).json(property)

})

// @desc    Update Property
// @route   PUT /api/properties/:id
//@access   Private
const updateProperty = asyncHandler(async(req,res) =>{
    const property = await Property.findById(req.params.id)

    if(!property){
        res.status(400)
        throw new Error('Property not Found')
    }

    const user = await User.findById(req.user.id)
    
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure th elogged user matches the property user
    if(property.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, 
        req.body, {
            new: true,
        })

    // res.status(200).json({ message: `Update Property ${req.params.id}`})
    res.status(200).json(updatedProperty)
})

// @desc    Delete Property
// @route   DELETE /api/properties/:id
//@access   Private
const deleteProperty = asyncHandler(async(req,res) =>{
    const property = await Property.findById(req.params.id)

    if(!property){
        res.status(400)
        throw new Error('Property not found')
    }


    const user = await User.findById(req.user.id)
    
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure th elogged user matches the property user
    if(property.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await property.remove()

    // res.status(200).json({ message: `Delete Property ${req.params.id}`})
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getProperties,
    getProperty,
    getPropertiesOfUser,
    setProperty,
    updateProperty,
    deleteProperty
}