const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
        name:{
            type: String,
            required: [true, 'Please add a name']
        },
        date:{
            type: Date,
            required: [true, 'Please add a date']
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