const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
        name:{
            type: String,
        },
        date:{
            type: Date,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        agent:{
            type: String,
            required: true
        }
        ,
        message:{
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Review',reviewSchema)