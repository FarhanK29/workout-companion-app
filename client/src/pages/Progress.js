import React from 'react'
import './Progress.css'
import Navbar from '../components/Navbar'
import Popup from '../components/WorkoutPopup'




export default function Progress() 
{
    const [buttonPopup, setButtonPopup] = React.useState(false);

    const [workouts, setWorkouts] = React.useState([{workout_title:"Hello"},{workout_title:"Hello2"}, {workout_title:"hello3"}]);

    React.useEffect(() =>{
        const token = localStorage.getItem('token')
        const fetchData = async() => {
            const response = await fetch('api/progress/',{
                method:'GET',
                headers: {'Authorization': token,'Content-Type': 'application/json' },
                // body: JSON.stringify({token:token})
            })
            const json = await response.json();
            setWorkouts(json);
        };
        fetchData();
    }, [])




    return(
        <div className = "progress-page">
        <Navbar />
        <h1>History</h1>

        {workouts.map( (workout, index) => (
            <div className = "workouts" key = {index}>
                <div className = "workout-line">
                <div className = "workout-title">{workout.workout_name}</div>
                <button className = "more-info" onClick = {() => setButtonPopup(true)}>Arrow Icon</button>
                <Popup trigger = {buttonPopup} workout = {workout} setTrigger = {setButtonPopup}>

                </Popup>
                <hr></hr>
                </div>

            </div>
        ))}
        </div>
    )
}
