import React from 'react'
import './Workout.css'
import Navbar from '../components/Navbar'


export default function Workout() {

  const token = localStorage.getItem('token')


  const [workouts, setWorkouts] = React.useState([{
    exercise:'',
    sets: '',
    reps:'',
    weight: ''
  }])

  const handleChangeInput = (index, event) => {
    const values = [...workouts];
    values[index][event.target.name] = event.target.value;
    setWorkouts(values);
  }

  const addField = (event) => {
    event.preventDefault();
    setWorkouts([...workouts, {exercise:'', sets: '', reps: '', weight: ''}])
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(workouts);
    //Submit the workout to the database
    const response = await fetch('/api/logworkout', {
      method: 'POST',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify({token: token, workouts:workouts})
    })
    console.log(response)
    const json = await response.json();
    if(!response.ok){
      console.log(json.error);
    }
    else{
      alert("Workout Successfully Submitted!")
      setWorkouts([{
        exercise:'',
        sets: '',
        reps:'',
        weight: ''
      }])
    }
    

  }

  const deleteWorkout = (index) =>{
    const values = [...workouts];
    values.splice(index, 1);
    setWorkouts(values);
  }

  return (
    <div className = "workout-page">
      <Navbar />
      <div className = "workout-form container">
        <form className = "add-workout-form" onSubmit = {handleSubmit}>
          <h1>Add a Workout</h1>
          {workouts.map( (workout, index) => (
            <div className = "workouts" key = {index}>
              <div className = "workout-line">
                <label>Exercise Name:</label>
                <input 
                  name = "exercise"
                  className = "input-container" 
                  id = "exercise-input"
                  type = "text"  

                  value = {workout.exercise}
                  onChange = {(e) => handleChangeInput(index, e)} 
                />
                <label>Sets:</label>
                <input className = "input-container" 
                  name = "sets"
                  type = "number" 
                  value = {workout.sets}
                  onChange = {(e) => handleChangeInput(index, e)}
                />
                <label>Reps:</label>
                <input 
                  name = "reps"
                  className = "input-container"
                  type = "number" 
                  value = {workout.reps}
                  onChange = {(e) => handleChangeInput(index, e)}
                />
                <label>Weight:</label>
                <input
                  name = "weight"
                  className = "input-container"
                  type = "number"  
                  value = {workout.weight} 
                  onChange = {(e) => handleChangeInput(index, e)}
                />
                <label>lbs</label>
                <button className = "delete-button" onClick = {() => deleteWorkout(index)}>Delete</button>
              </div>
              <hr></hr>
            </div>
          ))}
          <button className = "add-button" onClick = {(event) => addField(event)} >Add Field</button>
          <button className = "submit-button" type = "submit" onClick = {(event) => handleSubmit(event)}>Submit</button>
            </form>
      </div>
    </div>
  )
}