const asyncHandler = require('express-async-handler')
const Property = require('../models/propertyModel.js')
const Agent = require('../models/agentsModel.js')
const path = require('path')
const express = require('express')

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
    if(!property){
        res.status(400)
        throw new Error('Property not found')
    }

    res.status(200).json(property)

})

// @desc    Get Properties
// @route   GET /api/properties
//@access   Private
const getPropertiesOfAgent = asyncHandler(async(req,res) =>{

    const properties = await Property.find({agent: req.decodedAgent.id})

    // res.status(200).json({ message: 'Get Properties' })
    res.status(200).json(properties)
})

// @desc    Set Property
// @route   POST /api/properties
//@access   Private
const setProperty = asyncHandler(async(req,res) =>{
    if(!req.body.Property_type || !req.body.Location){
        res.status(400)
        throw new Error('Please add property type or location')
    }
    if(!req.files){
        res.status(400)
        throw new Error('Please add at least one image')
    }

    var setPath = (file) =>{
        var site = file.path;
        if (path.sep === '\\') {
            site = site.split(path.sep).join('/');
        }
        site = process.env.SITE_NAME + site;
        
        return site;
    }

    const photos = req.files.map(setPath);
    const property = await Property.create({
        Property_type: req.body.Property_type,
        Location: req.body.Location,
        developer_name: req.body.developer_name,
        name_of_property: req.body.name_of_property,
        Bedrooms: req.body.Bedrooms,
        Bathrooms: req.body.Bathrooms,
        property_size: req.body.property_size,
        Three_link: req.body.Three_link,
        price: req.body.price,
        photos: photos,
        property_desc:req.body.property_desc,
        agent: req.decodedAgent.id
    })

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

    const agent = await Agent.findById(req.decodedAgent.id)
    
    //check for agent
    if(!agent){
        res.status(401)
        throw new Error('Agent not found')
    }

    //Make sure th elogged user matches the property user
    if(property.agent.toString() !== agent.id){
        res.status(401)
        throw new Error('Agent not authorized')
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


    const agent = await Agent.findById(req.decodedAgent.id)
    
    //check for user
    if(!agent){
        res.status(401)
        throw new Error('Agent not found')
    }

    //Make sure th elogged user matches the property user
    if(property.agent.toString() !== agent.id){
        res.status(401)
        throw new Error('Agent not authorized')
    }

    await property.remove()

    // res.status(200).json({ message: `Delete Property ${req.params.id}`})
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getProperties,
    getProperty,
    getPropertiesOfAgent,
    setProperty,
    updateProperty,
    deleteProperty
}