
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

router.get('/:date', async(req,res) =>{
    const token = req.headers.authorization;
    const date = req.params.date;
    console.log(date)
    console.log(token)

    user_id = jwt.decode(token).id;

    if(!token){
        return res.status(400).json({status:'error', error:'User is not logged in'})
    }
    const response = await Workout.find({user_id: user_id, workout_date: date})
    console.log("response", response);

    if(response.length == 0){
        return res.status(400).json({status: 'error', error:"Invalid username/password"})
    }
    return res.json(response);
        
})



router.put('/:id', async(req,res) => {
    const {token, workouts, workout_date } = req.body;
    const workoutId = req.params.id
    console.log(token)
    console.log(workouts)
    user_id = jwt.decode(token).id;


    if(!workouts){
        return res.status(400).json({status: 'error', error:"Invalid workout, please fill out all fields."})
    }
    
    const doc = await Workout.findOne({_id : workoutId})
    doc.exercises = workouts
    const response = await doc.save()
    if(!response){
        console.log("Could not save")
        return res.status(400).json({status:'error', error:'Could not save workout to existing workout.'})
    }
    console.log("Response Saved")
    res.status(200).json(response) 
})

module.exports = router;