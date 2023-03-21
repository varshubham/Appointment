const express = require('express');
const User = require('../models/Users');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const moment = require('moment');
const mongoose = require('mongoose')
const SECRETKEY = "thisisasecretkey";

router.post('/createuser', [
    body('email', 'Enter Correct Email').isEmail(),
    body('name', 'Name must not be empty').notEmpty(),
    body('password', 'Must must be greater than 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let success = false;
        var user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry User with this email already exist", success })
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                isAdmin: req.body.isAdmin
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, SECRETKEY);
            success = true;
            res.json({ token, success })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
})

router.post('/login', [
    body('email', "Enter valid email").isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() })
    }
    try {
        let success = false;
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).send({success:false,message:"user with this email does not exist"})
        }
        const comparedpassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparedpassword) {
            res.status(400).send({success:false,message:"please login with correct credentials"});
        }
        else{
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, SECRETKEY);
            success = true;
            res.json({ token, success })
        }
        
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

router.get('/userdetail', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        res.status(500).send("Internal server  error")
    }
})

router.get('/getbyid/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password")
        res.send(user)
    } catch (error) {
        res.send(500).send("Internal Server Error")
    }
})

router.post('/doctoraccount', fetchuser, async (req, res) => {
    try {

        const isAdmin = await User.findById(req.user.id);
        if (isAdmin.isAdmin === true) {
            res.status(400).send("Admin cannot apply for doctor")
        }
        else {
            const isdoctor = await Doctor.find({ userId: req.user.id });
            if (isdoctor.length !== 0) {
                res.status(400).send({success:false,message:"You have already applied for Doctor Account"})
            }
            else {
                const doctor = await Doctor.create({
                    userId: req.user.id, ...req.body, status: "pending"
                })
                const admin = await User.findOne({ isAdmin: true });

                const unseenNotifications = admin.notificationunseen;
                unseenNotifications.push({
                    type: "New Doctor Request",
                    message: `${doctor.firstname} ${doctor.lastname} has applied for doctor Profile`,
                    id: doctor._id,
                    onCLickPath: "/admin/doctorslist"
                });

                await User.findByIdAndUpdate(admin._id, { notificationunseen: unseenNotifications }, { new: true })

                res.status(200).send({
                    message: "Account Successfully Applied",
                    success: true
                })
            }
        }
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.post('/markasseen', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const useennotifications = user.notificationunseen;
        const seennotifications = user.notificationseen;
        seennotifications.push(...useennotifications);
        user.notificationunseen = [];
        user.notificationseen = seennotifications;
        const updateduser = await user.save();
        updateduser.password = undefined;
        res.status(200).send({
            success: true,
            massage: "All notifications are marked as seen",
            data: updateduser
        })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.post('/deletenotifications', fetchuser, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        user.notificationseen = [];
        user.notificationunseen = [];
        const updateduser = await user.save();
        updateduser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Notifications cleared",
            data: updateduser
        })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.get('/getalldoctors', fetchuser, async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: "approved" });
        res.status(200).send({
            success: true,
            doctors
        })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.post('/bookappointment', fetchuser, async (req, res) => {
    try {
        const status = "pending";
        const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        const time = moment(req.body.time, "HH:mm").toISOString();
        const appointment = await Appointment.create({
            userId: req.user.id,
            doctorId: req.body.doctorId,
            userName:req.body.uname,
            doctorName:req.body.dname,
            date: date,
            time: time,
            status:status
        })

        const doctor = await Doctor.findOne({ _id: req.body.doctorId });
        const user = await User.findById(doctor.userId)

        const user2  = await User.findById(req.user.id)
        const name = user2.name;
        
        user.notificationunseen.push({
            type: "New Appointment Request",
            message: `A new appointment request has been made by ${name} `,
            onClickPath: "/doctor/appointments"
        })
        await user.save();

        res.status(200).send({
            appointment:appointment,
            success: true,
            message: "Appointment Booked"
        })

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.post('/checkavailability', fetchuser, async (req, res) => {
    try {
        const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        const fromTime = moment(req.body.time, "HH:mm").subtract(1, "hours").toISOString();
        const endTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
        const doctorId = req.body.doctorId;
        const appointment = await Appointment.find({
            doctorId,
            date,
            time: { $gte: fromTime, $lte: endTime }
        })
        if (appointment.length > 0) {
            return res.status(200).send({
                message: "Appointment not available",
                success: false
            })
        }
        else {
            return res.status(200).send({
                message: "Appointment available",
                success: true
            })
        }
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.get("/getappointment", fetchuser, async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user.id });
        res.status(200).send({
            appointments,
            success: true
        })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router