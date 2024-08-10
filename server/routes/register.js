const express = require('express');
const bcrypt = require('bcryptjs');

//imported user schema that we created
const User = require('../models/userModel')

const router = express.Router();

router.post('/', async (req,res) =>{
    console.log(req.body);
    const { username, password: plainTextPassword } = req.body
    //Hashing password using bcrypt library
    //bcrypt: js implementation of bcrypt
    //plainTextPassword signals a password that is not yet encrypted and in readable format
    if(!username || typeof username !== 'string'){
        return res.status(400).json({status: 'error', error: 'Invalid Username'})
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.status(400).json({status: 'error', error: 'Invalid Password'})
    }

    const password = await bcrypt.hash(plainTextPassword,10)//second argument of bcrypt.hash is number of iterations that bcrypt is run
    try{
        const response = await User.create({
                username,
                password
            }
        )
        console.log('User successfully created an account', response)
        res.status(200).json(response)
    } catch(error) {
        if(error.code === 11000){
            return res.status(400).json(({status: 'error',data: '', error:'Username already in use'}))
        }
        throw error
    }


})


module.exports = router;