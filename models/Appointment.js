const mongoose = require('mongoose')
const {Schema} = mongoose

const AppointmentSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    doctorId : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    userName:{
        type : String
    },
    doctorName:{
        type:String
    },
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    status :{
        type : String,
        required : true,
        default : "pending"
    }
},{
    timestamps : true
})

const appointment = mongoose.model('appointment',AppointmentSchema);
module.exports = appointment;