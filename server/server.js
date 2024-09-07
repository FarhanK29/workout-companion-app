require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/WorkoutRoutes')
const register = require('./routes/register')
const login = require('./routes/login')
const User = require('./models/userModel')
const auth = require('./routes/auth');



//to run server: nodemon server.js 



//create express app
const app = express();

//set up middleware (any code that executes before a response is given from server)

//Checks if any request has body data. If yes attaches it to the req object
app.use(express.json());

//Logs the path and method called to server for debugging
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


console.log(__dirname)
//Any api call starting with "/api/workouts" will be redirected to the different routes in the routes folder

app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/auth', auth)
app.use('/api/workout', workoutRoutes)

//Use the client app
app.use(express.static('/client/build'))

//Render client for any path
app.get('*', (req,res) => res.sendFile(__dirname, '/client/dist/index.html'))

//connect to mongodb and listen for requests
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to db and server started on port', process.env.PORT);
    });
})
.catch((error) => {console.log(error)});
    