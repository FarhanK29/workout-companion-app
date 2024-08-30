const express = require('express');
const User = require('../models/userModel') //imports user schema that we created 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv')

const router = express.Router();

router.post('/', async(req,res) => {
    const {username , password } = req.body;

    const user = await User.findOne({ username }).lean()
    console.log(user)

    if(!user) {
        return res.status(400).json({status: 'error', error:"Invalid username/password"})
    }

    if(await bcrypt.compare(password, user.password)){

        const token = jwt.sign({ id: user._id, username:user.username }, process.env.JWT_SECRET)
        return res.json({status:"ok", data: token})
    }

    return res.status(400).json({status: 'error', error: "Invalid username/password"})
})

module.exports = router