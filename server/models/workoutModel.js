const mongoose = require('mongoose');


const Schema = mongoose.Schema;
//Created a user database schema showing types of data to take into db as well as whether or not its required
const WorkoutSchema = new Schema(
    {
        workout_name: {
            type: String,
            required: true,
            unique: true
        },
        user_id:{
            type:String,
            required: true
        },
        exercises: 
        [
            {
                exercise: {
                    type: String,
                    required: true
                },
                setAmount: {
                    type: Number,
                    required: true
                },
                sets:
                [
                    {
                        reps: {
                            type: Number,
                            required: true
                        },
                        weight: {
                            type: Number,
                            required: true
                        }
                    }
                ]
            }
        ],

    },
    {
        collection:'workouts',
        timestamps:true
    },

);

module.exports = mongoose.model('WorkoutSchema', WorkoutSchema)
