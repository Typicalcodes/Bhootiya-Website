const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017"

const connecttomongo = async ()=>{
    try {
    await mongoose.connect(mongoURI)
    
    } catch (error) {
        console.log(error)
    }
    
}
module.exports = connecttomongo;