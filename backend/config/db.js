const mongoose = require('mongoose')
const connectionParams = {useNewUrlParser: true}

const connectDB = async () =>{
    try{
        const conn = mongoose.connect(process.env.MONGO_URI, connectionParams)
        console.log("Mongodb connected successfully")
    } catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB