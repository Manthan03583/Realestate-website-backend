const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel.js')

const setReview = asyncHandler(async(req,res) =>{
    const {name, agent, message} = req.body
    const date = new Date();
    
    if(!name || !date || !agent){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const todayAtMidnight = new Date(date.setHours(0, 0, 0, 0));

    const review = Review.create({
        name,
        todayAtMidnight,
        user:req.user.id,
        agent,
        message
    })

    if(review){
        res.send({message: 'Review submitted successfully'})
    }
    else{
        res.status(404)
        throw new Error('Please add some data')
    }
})

const getAgentReviews = asyncHandler(async(req,res)=>{
    const reviews = await Review.find({agent: req.params.id})

    if(reviews){
        res.status(200).json(agents)
    }
    else{
        res.status(404)
        throw new Error('Error finding review')
    }

})

module.exports={
    setReview,
    getAgentReviews
}