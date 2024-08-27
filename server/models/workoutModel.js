const mongoose = require('mongoose');


const Schema = mongoose.Schema;
//Created a user database schema showing types of data to take into db as well as whether or not its required
const WorkoutSchema = new Schema(
    {
        workout_date: {
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
                sets:
                [
                    {
                        reps: {
                            type: String,
                            required: true
                        },
                        weight: {
                            type: String,
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
