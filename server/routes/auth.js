const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs')


const router = express.Router();
require('dotenv');


router.get('/', async(req,res) => {
    const token = req.token;

        if(token){
            jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) =>{
                if(error){
                    console.log(error.message);
                    res.status(400).json({error:"Failed to authenticate"})
                } else{
                    console.log(decodedToken);
                    res.status(200).json({body:"User successfully authenticated"})
                }
            })
        }
        else{
            res.status(400).json({error:"Failed to authenticate"})
        }
})
module.exports = router;