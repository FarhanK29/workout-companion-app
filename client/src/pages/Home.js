import React from 'react'
import './Home.css'
import Navbar from '../components/Navbar'

//Date
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

//icons
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";


export default function Home() {

    //Date Picker
    let currentDate = Date();
    
    const [date, setDate] = React.useState(dayjs(currentDate))
    console.log(date)


    const token = localStorage.getItem('token')

    React.useEffect(() =>{
        const token = localStorage.getItem('token')
        const fetchData = async() => {
            const response = await fetch('api/progress/' + date,{
                method:'GET',
                headers: {'Authorization': token,'Content-Type': 'application/json' },

            })
            const json = await response.json();
            setWorkouts(json);
        };
        fetchData();
    }, [])

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
        body: JSON.stringify({token: token, workouts:workouts, workout_date: date})
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
        <LocalizationProvider dateAdapter = {AdapterDayjs}>
        <div className = "workout-page">
        <Navbar />
        <div className = "workout-form container">
            <form className = "add-workout-form" onSubmit = {handleSubmit}>
            <div className = "workout-date-container">
            <h1>Your Workout For</h1>

            <DatePicker
                className = "datePicker"
                value = {date}
                onChange = {(newDate) => setDate(newDate)}
                sx = {{
                    "& .MuiInputBase-input": {color:"white", fontSize:"1.5em"},
                    "& .MuiSvgIcon-root": {color:"white"},

                }}
            />


            </div>
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
                    <FaTrash className = "delete-button" onClick = {() => deleteWorkout(index)}/>
                </div>
                <hr></hr>
                </div>
            ))}
            <IoMdAdd className = "add-button" onClick = {(event) => addField(event)} />
            <button className = "submit-button" type = "submit" onClick = {(event) => handleSubmit(event)}>Save</button>
                </form>
        </div>
        </div>
        </LocalizationProvider>
    )
}