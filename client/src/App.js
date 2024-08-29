import React from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'


import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound'


const App = () =>{
    return(
    
        <BrowserRouter>
        <Routes>
            <Route path = "/login" element = {<Login />} />
            <Route path = "/register" element = {<Register />} />

            <Route element = {<ProtectedRoute />} >
                <Route path = "/" element = {<Home />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;



