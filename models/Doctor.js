const mongoose = require('mongoose')
const {Schema} = mongoose;

const DoctorSchema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : true
    },
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    phoneNumber : {
        type:Number,
        required : true
    },
    address : {
        type: String,
        required:true
    },
    specialization : {
        type : String,
        required : true
    },
    experience:{
        type : Number,
        required : true
    },
    fees : {
        type:Number,
        required:true
    },
    status:{
        type : String ,
        default : "pending"
    }
},{
    timestamps:true
})

const Doctor = mongoose.model('doctor',DoctorSchema);
module.exports = Doctor