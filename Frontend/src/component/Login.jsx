import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password
    };

    try {
      let apiUrl;
      if (userType === 'student') {
        apiUrl = 'http://localhost:8080/api/student/login'; 
      } else {
        apiUrl = 'http://localhost:8080/api/teacher/login'; 
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.role === 'student') {
          navigate('/studentDashboard'); 
        } else if (responseData.role === 'teacher') {
          navigate('/teacherDashboard'); 
        } else {
          console.error('Unknown role:', responseData.role);
          alert('Unknown role');
        }
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        alert('Login failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            User Type:
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
