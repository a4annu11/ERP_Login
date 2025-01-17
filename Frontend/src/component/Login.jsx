import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useTeacherAuth } from "../context/teacherAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); 
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [teacherauth, setTeacherAuth] = useTeacherAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (role === "student") {
        res = await axios.post("http://localhost:8080/api/student/login", {
          email,
          password,
        }, {
          withCredentials: true
        });
      } else if (role === "teacher") {
        res = await axios.post("http://localhost:8080/api/teacher/teacher-login", {
          email,
          password,
        }, {
          withCredentials: true
        });
      }
      if (res && res.data && res.data.success) {
        console.log(res.data)
        alert(res.data && res.data.message);
        
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        if (role === "student") {
          navigate("/student-dashboard");
        } else if (role === "teacher") {
          navigate("/teacher-dashboard");
          setTeacherAuth({
            ...teacherauth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("teacher", JSON.stringify(res.data));
        }
      } else if (res && res.data && res.data.message) {
        console.log(res.data)
        alert(res.data.message);
      } else {
        console.log(res.data)
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <div className="mb-3">
        <label htmlFor="role">Choose Role:</label>
        <select
          id="role"
          className="form-control"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
