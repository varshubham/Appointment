const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const fetchuser = require('../middleware/fetchuser');
const Appointment = require('../models/Appointment');
const User = require("../models/Users");

router.post('/getdoctordetails',fetchuser,async(req,res)=>{
    try {
            const doctor = await Doctor.findOne({userId: req.user.id})
            res.status(200).send({
                success:true,
                doctor
            })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.post('/getbyid',fetchuser,async(req,res)=>{
    try {
        const doctor = await Doctor.findOne({_id : req.body.id})
        res.status(200).send({
            success:true,
            doctor
        })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.get('/getappointments',fetchuser,async(req,res)=>{
    try {
        const doctor = await Doctor.findOne({
            userId : req.user.id
        })
        const appointments = await Appointment.find({
            doctorId : doctor._id
        })
        res.status(200).send({
            success: true,
            appointments
        })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.put('/change-status',fetchuser,async(req,res)=>{
    try {
        const {id,status} = req.body;
        const appointment = await Appointment.findByIdAndUpdate(id,{
            status:status
        },{new:true});
        const user = await User.findOne({_id:appointment.userId});
        const unseenNotifications = user.notificationunseen;
        unseenNotifications.push({
            type:"appointment status changed",
            message : `your appointment status has become ${status}`
        })
        await user.save();

        res.status(200).send({
            success:true,
            message:"Appointment status updated successfully",
            appointment:appointment
        })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router