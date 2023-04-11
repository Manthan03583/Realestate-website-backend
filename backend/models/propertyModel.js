const mongoose = require('mongoose')

const propertySchema = mongoose.Schema(
    {
        agent:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'agent',
        },
        Property_type:{
            type : String,
            required: [true, 'Please add type of property']
        },
        Location: {
            type: String,
            required: [true, 'Please add location of property']
        },
        developer_name:{
            type: String,
            required:[true, 'Please add developer name of property']
        },
        name_of_property:{
            type: String,
        },
        Bedrooms:{
            type: Number,
            required: [true, 'Please add number of Bedrooms in property']
        },
        Bathrooms:{
            type: Number,
            required: [true, 'Please add number of Bathrooms in property']
        },
        property_size:{
            type: String,
            required: [true, 'Please add number of Balcony in property']
        },
        Three_link:{
            type: String,
        },
        price:{
            type: Number,
            required:[true,'please add price of the property']
        },
        photos:{
            type: [String]
        },
        property_desc:{
            type: String
        }

    },{
        timestamps: true
    })

module.exports = mongoose.model('Property',propertySchema)