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

    //Date Picker
    let currentDate = Date();
    
    const [date, setDate] = React.useState(dayjs(currentDate))
    console.log(date)


    const token = localStorage.getItem('token')

    // React.useEffect(() =>{
    //     const token = localStorage.getItem('token')
    //     const fetchData = async() => {
    //         const response = await fetch('api/progress/' + date,{
    //             method:'GET',
    //             headers: {'Authorization': token,'Content-Type': 'application/json' },

    //         })
    //         const json = await response.json();
    //         setWorkouts(json);
    //     };
    //     fetchData();
    // }, [])

    const [workouts, setWorkouts] = React.useState([{
        exercise:'',
        sets: [],
    }])



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
        console.log(workouts);
        //Submit the workout to the database
        // const response = await fetch('/api/logworkout', {
        // method: 'POST',
        // headers:{ 'Content-Type': 'application/json' },
        // body: JSON.stringify({token: token, workouts:workouts, workout_date: date})
        // })
        // console.log(response)
        // const json = await response.json();
        // if(!response.ok){
        // console.log(json.error);
        // }
        // else{
        // alert("Workout Successfully Submitted!")
        // setWorkouts([{
        //     exercise:'',
        //     sets: [],
        // }])
        // }
        

    }

    const deleteWorkout = (index) =>{

        const values = [...workouts];
        values.splice(index, 1);
        setWorkouts(values);
    }

    const addSet = (index) =>{
        const values = [...workouts]
        values[index].sets.push([{reps:'', weight:''}])
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
                    onChange = {(e) => handleChangeName(index, e)} 
                    />
                    <FaTrash className = "delete-button" onClick = {() => deleteWorkout(index)}/>
                    <button className = "add-set" onClick = {() => addSet(index)}>Add Set</button>
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