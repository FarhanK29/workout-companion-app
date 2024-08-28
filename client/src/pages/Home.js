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
import { MdOutlineClose } from "react-icons/md";



export default function Home() {

    let currentDate = dayjs()
    const [date, setDate] = React.useState(currentDate)
    // console.log(date)
    // console.log(date.get('year'))
    // console.log(date.get('month'))
    // console.log(date.get('date'))

    const [exists, setExists] = React.useState(false)

    const token = localStorage.getItem('token')

    React.useEffect(() =>{
        console.log(date)
        const formattedDate = `${date.get('year')}-${date.get('month')+1}-${date.get('date')}`
        const token = localStorage.getItem('token')
        const fetchData = async() => {
            const response = await fetch('api/workout/'+formattedDate, {
                method:'GET',
                headers: {'Authorization': token,'Content-Type': 'application/json' },
            })

            
            console.log(response)
            if(!response.ok){
                setExists(true)
            }
            else{
                setExists(false)
                const json = await response.json();
                setWorkouts(json[0].exercises);
            }
        };
        fetchData();
    }, []);

    const [workouts, setWorkouts] = React.useState([{
        exercise:'',
        sets: [],
    }])

    const handleChangeDate = (newDate) => {
        
        const formattedDate = `${date.get('year')}-${date.get('month')+1}-${date.get('date')}`
        const token = localStorage.getItem('token')
        const fetchData = async() => {
            const response = await fetch('api/workout/'+formattedDate, {
                method:'GET',
                headers: {'Authorization': token,'Content-Type': 'application/json' },
            })

            
            console.log(response)
            if(!response.ok){
                setExists(true)
            }
            else{
                setExists(false)
                const json = await response.json();
                setWorkouts(json[0].exercises);
            }
        };
        fetchData();
    }



    const handleChangeName = (index, event) => {
        const values = [...workouts];
        values[index][event.target.name] = event.target.value;
        setWorkouts(values);
    }
    const handleChangeInput = (index, setIndex, event) =>{
        const values = [...workouts];
        values[index].sets[setIndex][event.target.name] = event.target.value;
        setWorkouts(values)
    }

    const addField = (event) => {
        event.preventDefault();
        setWorkouts([...workouts, {exercise:'', sets:[]}])
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        // console.log(workouts)

        //Submit the workout to the database
        const formattedDate = `${date.get('year')}-${date.get('month')+1}-${date.get('date')}`
        console.log(formattedDate)
        console.log(exists)
        if(!exists){
            const response = await fetch('/api/workout', {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({token: token, workouts:workouts, workout_date: formattedDate})
            })
            console.log(response)
            const json = await response.json();
            if(!response.ok){
            console.log(json.error);
            }
            else{
                alert("Workout Successfully Saved!")
                setWorkouts([{
                    exercise:'',
                    sets: [],
                }])
            }
        }
        else{
            const response = await fetch('/api/workout'+ formattedDate, {
                method:'PATCH',
                headers:{'Content-Type': 'application/json' },
                body: JSON.stringify({token, token, workouts: workouts, workout_date: formattedDate})

            })

        }
        

    }

    const deleteWorkout = (index) =>{

        const values = [...workouts];
        values.splice(index, 1);
        setWorkouts(values);
    }

    const addSet = (e, index) =>{
        e.preventDefault();
        const values = [...workouts]
        values[index].sets.push({reps:'', weight:''})
        setWorkouts(values)
    }

    const deleteSet = (index, setIndex) => {
        const values = [...workouts]
        values[index].sets.splice(setIndex,1);
        setWorkouts(values)
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
                    onChange = {(e) => handleChangeName(index, e)} 
                    />
                    <FaTrash className = "delete-button" onClick = {() => deleteWorkout(index)}/>
                    {workouts[index].sets.map((set, setIndex) => (
                        <div className = "sets" key = {setIndex}>
                            <div className = "set-title">Set {setIndex+1}</div>
                            <label>Reps:</label>
                            <input 
                            name = "reps"
                            className = "input-container"
                            type = "text" 
                            value = {set.reps}
                            onChange = {(e) => handleChangeInput(index, setIndex, e)}
                            />
                            <label>Weight:</label>
                            <input
                            name = "weight"
                            className = "input-container"
                            type = "text"  
                            value = {set.weight} 
                            onChange = {(e) => handleChangeInput(index, setIndex, e)}
                            />
                            <label>lbs</label>
                            <MdOutlineClose className = "delete-set" onClick = {(e) => deleteSet(index, setIndex)}/>
                        </div>
                        
                    ))}
                <button className = "add-set" onClick = {(e) => addSet(e,index)}>Add Set</button>
                </div>
                <hr></hr>
                </div>
            ))}
            <IoMdAdd className = "add-button" onClick = {(event) => addField(event)} />
            <button className = "submit-button" type = "submit">Save</button>
                </form>
        </div>
        </div>
        </LocalizationProvider>
    )
}