const mongoose = require('mongoose')

const visitRequestSchema = mongoose.Schema({
        name:{
            type: String,
            required: [true, 'Please add a name']
        },
        email:{
            type: String,
            required: [true, 'Please add an email'],
            unique: true
        },
        phone:{
            type: String,
            required: [true, 'Please add a phone']
        },
        message:{
            type:String,
        },
        propertyId:{
            type:String,
            required: [true, 'please add property']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Visitrequest',visitRequestSchema)