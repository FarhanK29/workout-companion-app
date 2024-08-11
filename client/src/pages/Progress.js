import React from 'react'
import Popup from 'reactjs-popup';
import './Progress.css'
import Navbar from '../components/Navbar'




export default function Progress() 
{
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
    // console.log(workouts)

    return(
        <div className = "progress-page">
        <Navbar />
        <h1>History</h1>

        {workouts.map( (workout, index) => (
            <div className = "workouts" key = {index}>
              <div className = "workout-line">
                <Popup trigger =
                {<div className = "workout-title">{workout.workout_name}</div>}
                modal 
                nested>
                {
                    close =>(
                        <div className = "content">
                            POPUP RIGHT HERE
                        </div>
                        
                    )
                }
                </Popup>
                <hr></hr>
              </div>

            </div>
        ))}
        </div>
    )
}
