const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Doctor = require('../models/Doctor');
const fetchuser = require('../middleware/fetchuser');

router.get('/getalldoctors',fetchuser,async(req,res)=>{
    try {
        const doctors = await Doctor.find({});
        res.status(200).send({
            success:true,
            doctors
        })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.get('/getallusers',fetchuser,async(req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).send({
            success:true,
            users
        })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.post('/changedoctorstatus',fetchuser,async(req,res)=>{
    try {
        const {doctorId,status} = req.body;
        const doctor = await Doctor.findByIdAndUpdate(doctorId,{
            status:status
        },{new:true})
        const user = await User.findOne({_id:doctor.userId})
        const unseenNotifications = user.notificationunseen;
        unseenNotifications.push({
            type:"new doctor request changed",
            message : `Your doctor account status has become ${status}`,
            onClickPath : "/notifications"
        })
        user.isDoctor = (status === "approved" ?true : false);
        await user.save();
        res.send({success:true,newdoctor:doctor})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router