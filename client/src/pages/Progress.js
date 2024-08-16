import React from 'react'
import './Progress.css'
import Navbar from '../components/Navbar'
import Popup from '../components/WorkoutPopup'






export default function Progress() 
{
    const [buttonPopup, setButtonPopup] = React.useState(false);

    const [workouts, setWorkouts] = React.useState([]);

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


    console.log(workouts[0])

    return (

            <div className="progress-background">
                <Navbar />
                <div className = "progress-page">
                    <h1>History</h1>

                    {workouts.map((workout, index) => (
                        <div className="workouts" key={index}>
                            <div className="workout-line">
                                <div className="workout-title" onClick={() => setButtonPopup(index)} >{workout.workout_name}</div>
                                <Popup
                                    trigger={buttonPopup === index}
                                    workout={workout}
                                    setTrigger={setButtonPopup}
                                ></Popup>
                                <hr/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
}
