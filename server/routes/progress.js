const express = require('express');
const User = require('../models/userModel') //imports user schema that we created
const Workout = require('../models/workoutModel')
const jwt = require('jsonwebtoken')

require('dotenv')

const router = express.Router();
router.get('/', async(req,res) =>{
    const token = req.headers.authorization;
    user_id = jwt.decode(token).id;

    if(!token){
        return res.status(400).json({status:'error', error:'User is not logged in'})
    }
    const response = await Workout.find({user_id: user_id}).sort({createdAt:-1});
        console.log(response);
        return res.json(response);
        
})

module.exports = router;