const express = require('express');
const User = require('../models/userModel') //imports user schema that we created
const Workout = require('../models/workoutModel')
const jwt = require('jsonwebtoken')

require('dotenv')

const router = express.Router();
const date = new Date();


router.post('/', async(req,res) => {
    const {token, workouts, workout_date } = req.body;
    // const user = await User.findOne(username)
    console.log(token)
    console.log(workouts)
    console.log(workout_date)
    user_id = jwt.decode(token).id;

    if(!workouts){
        return res.status(400).json({status: 'error', error:"Invalid workout, please fill out all fields."})
    }
    
    const response = await Workout.create({
        "workout_date" : workout_date,
        "user_id": user_id,
        "exercises": workouts
    })
    console.log("Workout added");
    res.status(200).json(response)
})

module.exports = router;