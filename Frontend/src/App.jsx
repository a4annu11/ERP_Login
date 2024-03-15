import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Register from './component/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Register/>} />
    </Routes>
    </>
  )
}

export default App
