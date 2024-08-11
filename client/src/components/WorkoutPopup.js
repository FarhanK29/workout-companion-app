import React from 'react'
import './WorkoutPopup.css'

export default function WorkoutPopup(props) {
    const workout = props.workout;
    console.log(workout)

    return (props.trigger) ? (
        <div className = "popup">
            <div className = "popup-inner">
                <button className = "close-btn" onClick = {() => {props.setTrigger(false)}}>x</button>
                { props.children }
            <div>{workout.workout_name}</div>
            </div>
        </div>
    ) : "";
}
