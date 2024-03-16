import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Register from './component/Register';
import Login from './component/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
    
    </Routes>
    </>
  )
}

export default App
