// const express = require('express');

// //Creates a router to redirect request to the appropriate function based off the path
// const router = express.Router();

// router.get('/:id', (req,res) => {
//    res.json({msg: "GET SPECIFIC WORKOUT INFO HERE"})
// })

// router.post('/', (req,res) => {
//     res.json({msg: "CREATE WORKOUT FUNCTION HERE"})
// })

// router.delete('/:id', (req,res) =>{
//     res.json({msg: "DELETE WORKOUT FUNCTION HERE"})
// })

// router.patch('/:id',(req,res) => {
//     res.json({msg: "UPDATE WORKOUT FUNCTION HERE"});
// })

// module.exports = router;



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
    console.log(response);
    return res.json(response);
        
})

module.exports = router;