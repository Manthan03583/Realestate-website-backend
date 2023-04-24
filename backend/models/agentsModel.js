const mongoose = require('mongoose')

const agentSchema = mongoose.Schema({
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
            type:String,
            required: [true, 'Please add a phone number']
        },
        password:{
            type: String,
            required: [true, 'Please add a password']
        },
        profilePic:{
            type:String
        },
        review:{
            type: Number,
            max: 5            
        },
        address:{
            type: String
        },
        description:{
            type: String
        }, 
        experience:{
            type: String
        }, 
        propertyTypes:{
            type: String
        }, 
        propertyArea:{
            type: String
        }, 
        licenseNo:{
            type: String
        }, 
        website:{
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Agent',agentSchema)