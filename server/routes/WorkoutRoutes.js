const express = require('express');

//Creates a router to redirect request to the appropriate function based off the path
const router = express.Router();

router.get('/:id', (req,res) => {
   res.json({msg: "GET SPECIFIC WORKOUT INFO HERE"})
})

router.post('/', (req,res) => {
    res.json({msg: "CREATE WORKOUT FUNCTION HERE"})
})

router.delete('/:id', (req,res) =>{
    res.json({msg: "DELETE WORKOUT FUNCTION HERE"})
})

router.patch('/:id',(req,res) => {
    res.json({msg: "UPDATE WORKOUT FUNCTION HERE"});
})

module.exports = router;

