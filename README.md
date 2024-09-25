# Workout Companion Web Application

The Workout Companion App is a full-stack web application designed to help users log and track their workouts, making it easy to see progress over time. Built with React on the frontend and Node.js, Express, and MongoDB on the backend, this app allows users to record exercises, sets, and reps and view their workout history on any day on the calendar.


## Features

* Workout Logging: Users can log exercises with any number of sets and reps through a dynamic form field.
* Workout History: Track past workouts by date and view progress over time.
* Calendar View: Easily check workout progress on specific days using an integrated calendar.
* Responsive Frontend: Uses Material-UI for a sleek, responsive UI and react-icons for added visual appeal.
* Secure Authentication: User authentication is handled with JWT (JSON Web Tokens) to ensure secure access to personal workout data.
* Persistent Data Storage: All workouts are saved in a MongoDB database for easy retrieval and review at any time with efficient query times.


## How It Works

1. User Authentication:

* Users register and log in to the app, with their session managed by JWT authentication.
* Each user’s workouts are saved in their own secure account.

2. Logging Workouts:
* Users can dynamically add exercises to a workout log, including the number of sets and reps for each exercise.
* After saving, the workout is saved to the MongoDB database.

3. Viewing History:
* Users can view their workout history using a calendar, which displays workouts logged on specific dates.
* This feature helps users track progress and see improvements over time.

4. Interactive UI:
* The frontend is designed with Material-UI for a modern look and feel.
* React-icons are used for an intuitive and attractive user interface.

## Tech Stack

**Client:** React.js, Material-UI, react-icons

**Server:** Node.js, Express.js

**Database** MongoDB

**Authentication** JWT (JSON Web Tokens) for user authenticatoin

**Hosting** Website is hosted using render with cron-job sending http requests every 14 minutes to avoid timeout. 


## Roadmap

- Add a feature to visualize workout progress over time with charts

- Enable sharing of workout progress with friends or trainers.

- Add the ability to create and track specific workout routines


##Demo

Link to Website: https://workout-companion.onrender.com
