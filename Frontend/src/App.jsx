import './App.css'
import { Routes, Route } from "react-router-dom";
import Register from './component/Register';
import Login from './component/Login';
import Student from './component/Student';
import Teacher from './component/Teacher';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/student-dashboard' element={<Student/>} />
      <Route path='/teacher-dashboard' element={<Teacher/>} />
      <Route path='/login' element={<Login/>}  />
      {/* <Route path="/verify-email/:token" component={VerifyEmail} /> */}
    </Routes>
    </>
  )
}

export default App
