import React from 'react'
import './WorkoutPopup.css'

//icons
import { IoIosCloseCircleOutline } from "react-icons/io";


export default function WorkoutPopup(props) {
    const workout = props.workout;

    return (props.trigger) ? (
        <div className = "popup">
            <div className = "popup-inner">
                <IoIosCloseCircleOutline color = "red" size = "35px" className = "close-btn"onClick = {() => {props.setTrigger(false)}} />
                { props.children }
            <h3>{workout.workout_name}</h3>
            {workout.exercises.map((exercise, index) =>(
                <div className = "exercise-info" key = {index}>
                    <div className = "popup-label" ><strong>Exercise</strong>: {exercise.exercise}</div>
                    <div className = "popup-label"><strong>Sets</strong>: {exercise.sets}</div>
                    <div className = "popup-label"><strong>Reps</strong>: {exercise.reps}</div>
                    <div className = "popup-label"><strong>Weight</strong>: {exercise.weight} lbs</div>
                    <hr></hr>
                </div>
            ))}
            </div>
        </div>
    ) : "";
}
