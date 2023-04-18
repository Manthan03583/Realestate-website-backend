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
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Agent',agentSchema)