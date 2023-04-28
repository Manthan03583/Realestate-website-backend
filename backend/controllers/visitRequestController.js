const asyncHandler = require('express-async-handler')
const Visitrequest = require('../models/visitRequestModel.js')

const setVisitRequest = asyncHandler(async(req,res)=>{
    const {name, email, phone, date, message, propertyId} = req.body

    if(!name || !email || !phone || !date || !propertyId){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const visitrequest = Visitrequest.create({
        name,
        email,
        phone,
        date,
        message,
        propertyId
    })

    if(visitrequest){
        res.send({message: 'visit request schedule successfully'})
    }
    else{
        res.status(404)
        throw new Error('Please add some data')
    }
})

module.exports={
    setVisitRequest
}